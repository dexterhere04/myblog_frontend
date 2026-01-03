"use client"

import React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

type Props = {
  content: string
  title?: string
  date?: string
  author?: string
  cover?: string
  className?: string
}

export default function BlogPostReader({
  content,
  title,
  date,
  author,
  cover,
  className = "",
}: Props) {
  return (
    <article className={`glass p-8 rounded-xl shadow-lg ${className}`}>
      {cover && (
        <div className="mb-6 overflow-hidden rounded-lg">
          <img src={cover} alt={title ?? "cover"} className="w-full h-auto object-cover" />
        </div>
      )}

      {(title || date || author) && (
        <header className="mb-6">
          {title && <h1 className="text-3xl font-semibold mb-2">{title}</h1>}
          <div className="text-sm text-slate-600 dark:text-slate-300">
            {author && <span className="mr-3">{author}</span>}
            {date && <time>{date}</time>}
          </div>
        </header>
      )}

      <section className="prose prose-lg max-w-none dark:prose-invert">
        <ReactMarkdown remarkPlugins={[remarkGfm]}
          components={{
            a: ({node, ...props}) => (
              // open external links in new tab
              <a {...props} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline" />
            ),
            code: ({inline, className, children, ...props}) => {
              if (inline) return <code className="rounded px-1 bg-slate-100 dark:bg-slate-800" {...props}>{children}</code>
              return (
                <pre className="bg-slate-900 text-white rounded-lg p-4 overflow-auto"><code className={className} {...props}>{children}</code></pre>
              )
            },
            img: ({node, ...props}) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img {...props} className="max-w-full rounded-md border border-transparent" />
            ),
            blockquote: ({node, ...props}) => (
              <blockquote className="pl-4 border-l-4 border-slate-300 italic text-slate-700 dark:text-slate-300" {...props} />
            ),
            table: ({node, ...props}) => (
              <div className="overflow-auto"><table className="min-w-full" {...props} /></div>
            ),
            th: ({node, ...props}) => <th className="bg-slate-100 px-3 py-1 text-left" {...props} />,
            td: ({node, ...props}) => <td className="border-t px-3 py-2" {...props} />,
          }}
        >
          {content}
        </ReactMarkdown>
      </section>
    </article>
  )
}