import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t bg-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-3">About</h3>
            <p className="text-sm text-muted-foreground">
              PolyAgent Research Intelligence helps researchers streamline and enhance their research process using cutting-edge AI technology.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">About</Link>
              </li>
              <li>
                <Link href="/feedback" className="hover:text-primary transition-colors">Feedback</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-3">Contact</h3>
            <p className="text-sm text-muted-foreground">
              Have questions? Reach out to us at{' '}
              <a 
                href="mailto:support@polyagent.ai" 
                className="text-primary hover:underline"
              >
                support@polyagent.ai
              </a>
            </p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} PolyAgent Research Intelligence. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}