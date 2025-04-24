import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { Link } from "wouter";

type BreadcrumbsProps = React.HTMLAttributes<HTMLElement> & {
  segments: {
    name: string;
    href?: string;
  }[];
};

export function Breadcrumbs({ segments, className, ...props }: BreadcrumbsProps) {
  return (
    <nav 
      className={cn("flex", className)} 
      aria-label="Breadcrumb" 
      {...props}
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {segments.map((segment, i) => (
          <li key={i} className="inline-flex items-center">
            {i > 0 && (
              <ChevronRight className="mx-1 h-4 w-4 text-gray-400 dark:text-gray-500" />
            )}
            
            {segment.href && i < segments.length - 1 ? (
              <Link 
                href={segment.href} 
                className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
              >
                {i === 0 && (
                  <svg 
                    className="mr-2 h-4 w-4" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                )}
                {segment.name}
              </Link>
            ) : (
              <span 
                className={cn(
                  "text-sm font-medium", 
                  i === segments.length - 1 
                    ? "text-gray-500 dark:text-gray-400" 
                    : "text-gray-700 dark:text-gray-300"
                )}
              >
                {i === 0 && (
                  <svg 
                    className="mr-2 inline h-4 w-4" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                )}
                {segment.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
