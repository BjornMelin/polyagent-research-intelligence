"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface TagInputProps {
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  maxTags?: number
  onError?: (message: string) => void
}

export function TagInput({
  value = [],
  onChange,
  placeholder = "Type and press Enter to add tags",
  maxTags = 5,
  onError
}: TagInputProps) {
  const [inputValue, setInputValue] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      const tag = inputValue.trim()

      if (tag) {
        if (value.length >= maxTags) {
          onError?.(`Maximum ${maxTags} tags allowed`)
          return
        }

        if (!value.includes(tag)) {
          onChange([...value, tag])
          setInputValue("")
        }
      }
    } else if (event.key === "Backspace" && !inputValue && value.length > 0) {
      onChange(value.slice(0, -1))
    }
  }

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove))
    inputRef.current?.focus()
  }

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 rounded-md border bg-background p-1.5">
        {value.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="flex items-center gap-1"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="rounded-full outline-none hover:bg-secondary focus:ring-2 focus:ring-primary"
              aria-label={`Remove ${tag} tag`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        <Input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? placeholder : ""}
          className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-1 py-0.5 h-8"
        />
      </div>
    </div>
  )
}