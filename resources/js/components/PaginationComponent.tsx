import React from "react"
import { cn } from "@/lib/utils"
import { Link } from "@inertiajs/react"

interface PaginationLink {
  url: string | null
  label: string
  active: boolean
}

interface PaginationProps {
  links: PaginationLink[]
  align?: "center" | "left" | "right"
  onNavigate?: (url: string) => void
}

export const Pagination: React.FC<PaginationProps> = ({
  links,
  align = "center",
  onNavigate,
}) => {
  const alignment =
    align === "left"
      ? "justify-start"
      : align === "right"
      ? "justify-end"
      : "justify-center"

  return (
    <div className={`mt-4 flex w-full ${alignment}`}>
      <nav className="inline-flex space-x-px rounded-md shadow-sm" aria-label="Pagination">
        {links.map((link, i) =>
          link.url ? (
            <Link
              key={i}
              href={link.url}
              onClick={(e) => {
                if (onNavigate && link.url) {
                  e.preventDefault()
                  onNavigate(link.url)
                }
              }}
              className={cn(
                "relative inline-flex items-center px-3 py-1.5 border text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-primary rounded-md transition-colors",
                link.active
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              )}
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          ) : (
            <span
              key={i}
              className="relative inline-flex items-center px-3 py-1.5 border text-sm font-medium rounded-md bg-gray-600/40 text-gray-400 cursor-not-allowed"
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          )
        )}
      </nav>
    </div>
  )
}
