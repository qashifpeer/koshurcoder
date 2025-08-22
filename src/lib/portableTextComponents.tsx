// 'use client'

// import { PortableTextComponents } from '@portabletext/react'
// import { useState } from 'react'
// import { Copy } from 'lucide-react'

export const portableTextComponents = {
  block: {
    h1: ({ children }: any) => (
      <h2 className="scroll-m-20 text-2xl pb-1 pt-4 font-bold tracking-tight lg:text-3xl">
        {children}
      </h2>
    ),
    h2: ({ children }: any) => (
      <h2 className="scroll-m-20 border-b pb-1 pt-4 text-2xl font-semibold tracking-tight first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight pb-1 pt-4">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="leading-7  text-lg [&:not(:first-child)]:mt-6">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="mt-6 border-l-2 pl-6 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
     codeBlock: ({ children } : any) => (
      <pre className="bg-black text-white text-sm p-4 rounded-md overflow-x-auto font-mono my-4">
        <code>{children}</code>
      </pre>
    )
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="my-4 ml-6 list-disc [&>li]:mt-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
  marks: {
    code: ({ children }: any) => (
      <code className="bg-gray-100 text-red-600 px-1 py-0.5 rounded font-mono text-sm">
        {children}
      </code>
    ),
    strong: ({ children }: any) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ value, children }: any) => (
      <a
        href={value?.href}
        className="underline underline-offset-4 text-primary hover:text-primary/80"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};
