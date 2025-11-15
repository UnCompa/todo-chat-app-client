import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type BreadcrumbProps = {
  items: { label: string; href?: string }[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center text-sm text-gray-600" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && (
            <ChevronRight className="w-4 h-4 mx-2 text-placeholder" />
          )}
          {item.href ? (
            <Link
              to={item.href}
              className="hover:text-blue-600 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
              <span className="font-medium text-placeholder/90">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
