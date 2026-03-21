// components/Footer.tsx
import Link from "next/link";
import { FaYoutube, FaFacebook, FaGithub, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        {/* Top section */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-lg font-semibold text-sky-300">
                KoshurCoder
              </span>
            </Link>
            <p className="mt-3 text-sm text-slate-400">
              Simplifying tech for Kashmir and beyond — code, tutorials, and
              practical guides in a language people actually understand.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-xs uppercase tracking-wide text-slate-500">
                Follow
              </span>
              <div className="flex gap-3">
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="KoshurCoder on YouTube"
                  className="rounded-full bg-slate-900 p-2 text-slate-300 hover:bg-sky-600 hover:text-white transition"
                >
                  <FaYoutube className="h-4 w-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="KoshurCoder on Facebook"
                  className="rounded-full bg-slate-900 p-2 text-slate-300 hover:bg-sky-600 hover:text-white transition"
                >
                  <FaFacebook className="h-4 w-4" />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="KoshurCoder on X"
                  className="rounded-full bg-slate-900 p-2 text-slate-300 hover:bg-sky-600 hover:text-white transition"
                >
                  <FaXTwitter className="h-4 w-4" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="KoshurCoder on GitHub"
                  className="rounded-full bg-slate-900 p-2 text-slate-300 hover:bg-sky-600 hover:text-white transition"
                >
                  <FaGithub className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 text-sm">
            <div>
              <h3 className="font-semibold text-slate-200">Content</h3>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link href="/blog" className="hover:text-sky-300">
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link href="/videos" className="hover:text-sky-300">
                    Videos
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="hover:text-sky-300">
                    Projects
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-200">Learn</h3>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link href="/tags/nextjs" className="hover:text-sky-300">
                    Next.js
                  </Link>
                </li>
                <li>
                  <Link href="/tags/sanity" className="hover:text-sky-300">
                    Sanity
                  </Link>
                </li>
                <li>
                  <Link href="/tags/trading" className="hover:text-sky-300">
                    Trading
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-200">More</h3>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link href="/about" className="hover:text-sky-300">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-sky-300">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-sky-300">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-10 border-t border-slate-800 pt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            © {year} KoshurCoder. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Built with Next.js, Sanity, and a lot of chai.
          </p>
        </div>
      </div>
    </footer>
  );
}