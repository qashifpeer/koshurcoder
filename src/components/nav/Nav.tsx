"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const navItems = [
  { label: "home", href: "/" },
  { label: "about", href: "/about" },
  { label: "video", href: "/video" },
  { label: "blog", href: "/blog" },
  { label: "contact", href: "/contact" },
] as const;
type NavItem = (typeof navItems)[number];

const Nav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu when window is resized to larger than mobile breakpoint
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 640 && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [menuOpen]);

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-30 transition-colors duration-300
        ${
          scrolled
            ? "bg-black bg-opacity-80 backdrop-blur-sm"
            : "bg-transparent"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between h-16">
        <Image
          src={"/Images/Logo/logo-horizontal.png"}
          alt="logo-horizontal"
          width={300}
          height={100}
          className="h-12 sm:h-14 md:h-16 w-auto object-contain"
        />
        {/* <div className="text-sky-100 font-bold text-xl cursor-pointer select-none">
          logo
        </div> */}

        {/* Desktop Nav Items */}
        <ul className="hidden sm:flex space-x-8 text-white capitalize tracking-wide text-md">
          {navItems.map((item: NavItem) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="hover:text-gray-300 cursor-pointer"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          className="sm:hidden flex items-center px-2 py-1 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`sm:hidden bg-black bg-opacity-90 backdrop-blur-sm transition-max-height duration-300 ease-in-out overflow-hidden ${
          menuOpen ? "max-h-60" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col p-4 space-y-4 text-white capitalize tracking-wide text-lg">
          {navItems.map((item: NavItem) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="hover:text-gray-300 cursor-pointer"
                onClick={() => setMenuOpen(false)} // close menu after click
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
