import {
  PortableTextComponents,
  PortableTextComponentProps,
  PortableTextBlock,
  PortableTextMarkComponentProps,
} from "@portabletext/react";

// Use these prop types instead of `any`
type BlockProps = PortableTextComponentProps<PortableTextBlock>;
type MarkProps = PortableTextMarkComponentProps;

export const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }: BlockProps) => (
      <h1 className="scroll-m-20 text-3xl pb-1 pt-4 font-bold tracking-tight lg:text-4xl">
        {children}
      </h1>
    ),
    h2: ({ children }: BlockProps) => (
      <h2 className="scroll-m-20 text-2xl pb-1 pt-4 font-bold tracking-tight lg:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }: BlockProps) => (
      <h3 className="scroll-m-20 text-xl pb-1 pt-4 font-semibold tracking-tight">
        {children}
      </h3>
    ),
    normal: ({ children }: BlockProps) => (
      <p className="leading-7 [&:not(:first-child)]:mt-2">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }: MarkProps) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }: MarkProps) => (
      <em className="italic">{children}</em>
    ),
    link: ({ children, value }: MarkProps) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        {children}
      </a>
    ),
  },
};
