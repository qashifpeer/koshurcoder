"use client";

import { links } from "@/constants";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const handleClick = () => setToggle(!toggle);

  return (
    <header className="bg-slate-900 text-slate-100">
      <nav className="px-4 relative bg-slate-900 text-slate-100 flex justify-between items-center h-16 max-w-6xl mx-auto z-40 shadow-xl transition-all duration-500">
        <Link href="/">
          <div className="flex items-end">
            <Image
              src="/Images/logo-white.png"
              alt="forests"
              width={30}
              height={30}
              className="md:w-12 md:h-12"
            />
            <h2 className="text-2xl font-bold leading-tight md:pb-1">
              koshur<span className="text-primary">coder</span>
            </h2>
          </div>
        </Link>
        <div className="lg:hidden">
          <div onClick={handleClick}>{toggle ? <ImCross /> : <FaBars />}</div>
        </div>

        {/* Mobile and Desktop Navigation */}
        <div
          className={`transition-left duration-300 ease-in-out flex flex-col justify-start items-center py-16 absolute w-[80%] max-lg:h-screen top-12
            lg:static lg:flex-row lg:py-0 lg:justify-end lg:space-x-8 lg:px-8 bg-slate-900
            ${toggle ? "left-0 pointer-events-auto z-40" : "-left-full pointer-events-none z-30"}
            lg:pointer-events-auto`}
        >
          {links.map((link, index) => (
            <Link
              href={link.path}
              key={index}
              onClick={handleClick}
              className="flex my-4 font-bold text-lg relative group transition-all duration-500 hover:translate-x-1"
            >
              {link.title}
              <span className="absolute inline-block h-[3px] w-0 bg-primary -bottom-2 transition-all duration-500 group-hover:w-full"></span>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
