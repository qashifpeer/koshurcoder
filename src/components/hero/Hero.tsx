"use client";

import Image from "next/image";
import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="relative w-screen h-screen">
      {/* Blog hero image as background */}
      <Image
        src="/Images/Hero/hero-image.png"
        alt="Koshur Coder Blog Hero"
        fill
        priority
        className="object-cover w-full h-full"
        sizes="100vw"
      />
      
      
      
    </section>
  );
};

export default Hero;
