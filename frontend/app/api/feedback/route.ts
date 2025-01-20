import { type NextRequest, NextResponse } from 'next/server'
import { feedbackSchema } from '@/lib/schemas'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const REPO_OWNER = 'BjornMelin'
const REPO_NAME = 'polyagent-research-intelligence'
const CACHE_DURATION = 1000 * 60 * 60 // 1 hour

interface CategoryCache {
  categories: Record<string, string>;
  lastFetched: number;
}

let categoryCache: CategoryCache = {
  categories: {},
  lastFetched: 0
}

async function fetchCategories(): Promise<Record<string, string>> {
  // Check if cache is still valid
  const now = Date.now()
  if (now - categoryCache.lastFetched < CACHE_DURATION && Object.keys(categoryCache.categories).length > 0) {
    return categoryCache.categories
  }

  if (!GITHUB_TOKEN) {
    throw new Error('GitHub token is not configured')
  }

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query GetDiscussionCategories($owner: String!, $name: String!) {
            repository(owner: $owner, name: $name) {
              discussionCategories(first: 10) {
                nodes {
                  id
                  name
                  emoji
                }
              }
            }
          }
        `,
        variables: {
          owner: REPO_OWNER,
          name: REPO_NAME,
        },
      }),
    })

    const result = await response.json()
    
    if (result.errors) {
      const firstError = result.errors[0]
      throw new Error(firstError.message || 'Failed to fetch categories')
    }

    if (!result.data?.repository?.discussionCategories?.nodes) {
      throw new Error('Repository or discussion categories not found')
    }

    const categories: Record<string, string> = {}
    result.data.repository.discussionCategories.nodes.forEach((category: { id: string; name: string }) => {
      categories[category.name.toLowerCase()] = category.id
    })

    // Update cache
    categoryCache = {
      categories,
      lastFetched: now
    }

    return categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    // Use more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('Could not resolve to a Repository')) {
        throw new Error('Repository not found or access denied')
      }
      throw error
    }
    throw new Error('Failed to fetch categories')
  }
}

// Exponential backoff retry logic
async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      if (attempt === maxRetries - 1) throw error
      
      const delay = baseDelay * Math.pow(2, attempt)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
  throw new Error('Max retries exceeded')
}

export async function GET() {
  try {
    if (!GITHUB_TOKEN) {
      return NextResponse.json(
        { error: 'GitHub integration is not configured' },
        { status: 503 }
      )
    }

    const categories = await fetchCategories()
    return NextResponse.json({ categories })
  } catch (error) {
    console.error('Error fetching categories:', error)
    
    // Return user-friendly error messages based on the error type
    if (error instanceof Error) {
      const statusCode = error.message.includes('not found') ? 404 : 500
      const userMessage = error.message.includes('not found')
        ? 'The feedback system is temporarily unavailable. Please try again later.'
        : 'Unable to load feedback categories. Please try again later.'
      
      return NextResponse.json(
        { error: userMessage },
        { status: statusCode }
      )
    }
    
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!GITHUB_TOKEN) {
      return NextResponse.json(
        { error: 'Feedback submission is temporarily unavailable' },
        { status: 503 }
      )
    }

    const data = await req.json()
    const validatedData = feedbackSchema.parse(data)

    // Fetch categories with retry logic
    const categories = await retryWithBackoff(() => fetchCategories())
    
    // Get the category ID (fallback to Ideas category if not found)
    const categoryId = categories[validatedData.category.toLowerCase()]
    if (!categoryId) {
      return NextResponse.json(
        { error: 'Invalid category selected' },
        { status: 400 }
      )
    }

    const discussionBody = `**Category:** ${validatedData.category}\n\n${validatedData.description}\n\n${
      validatedData.email ? `**Contact:** ${validatedData.email}` : ''
    }`

    // Create discussion with retry logic
    const createDiscussion = async () => {
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Authorization': `bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation CreateDiscussion($input: CreateDiscussionInput!) {
              createDiscussion(input: $input) {
                discussion {
                  url
                }
              }
            }
          `,
          variables: {
            input: {
              repositoryId: "R_kgDOLXGQrw",
              categoryId,
              title: `[${validatedData.category}] ${validatedData.title}`,
              body: discussionBody,
            },
          },
        }),
      })

      const result = await response.json()

      if (result.errors) {
        const firstError = result.errors[0]
        if (firstError.type === 'RATE_LIMITED') {
          throw new Error('RATE_LIMITED')
        }
        throw new Error(firstError.message)
      }

      return result
    }

    const result = await retryWithBackoff(createDiscussion)

    return NextResponse.json({
      success: true,
      discussionUrl: result.data.createDiscussion.discussion.url,
    })
  } catch (error) {
    console.error('Error:', error)
    
    if (error instanceof Error) {
      if (error.message === 'GitHub token is not configured') {
        return NextResponse.json(
          { error: 'Feedback submission is temporarily unavailable' },
          { status: 503 }
        )
      } else if (error.message === 'RATE_LIMITED') {
        return NextResponse.json(
          { error: 'Too many requests. Please try again in a few minutes.' },
          { status: 429 }
        )
      } else if (error.message.includes('not found')) {
        return NextResponse.json(
          { error: 'The feedback system is temporarily unavailable' },
          { status: 404 }
        )
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to submit feedback. Please try again later.' },
      { status: 500 }
    )
  }
}