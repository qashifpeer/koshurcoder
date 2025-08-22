import type { Metadata } from "next";
import { Navbar } from "@/components";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.koshurcoder.in"),
  title: "KoshurCoder | Tech Insights, Tutorials & Guides on Modern Technology",
  description:
    "KoshurCoder is a tech blog sharing insights, tutorials, and guides on coding, web development, software tools, and modern technology trends to help learners and professionals stay ahead.",
  keywords:
    "KoshurCoder, koshur coder, technology blog, coding tutorials, web development, python, Next.js, React.js, JavaScript, TypeScript, Python, Sanity CMS, SEO tips, software tools, programming guides, modern technology trends, tech insights, coding for beginners, full stack development, frontend development, backend development",
  openGraph: {
    title: "Koshur Coder",
    description: "Tech Insights, Tutorials & Guides on Modern Technology",
    url: "https://www.koshurcoder.in",
    siteName: "KoshurCoder",
    images: [
      {
        url: "https://www.koshurcoder.com/og-cover.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
