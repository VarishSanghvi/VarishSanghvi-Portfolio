"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const handleDownload = () => {
    window.open("/Resume_VarishSanghvi.pdf", "_blank");
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b w-full">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        {/* Logo with Image */}
        <Link href="/" className="flex items-center gap-4 select-none">
          <Image
            src="/favicon.ico"
            alt="Varish Sanghvi Logo"
            width={48} // Increased logo size
            height={48}
            className="rounded-full"
          />
          <span className="text-2xl font-bold text-gray-800 tracking-wide uppercase">
            Varish Sanghvi
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/#projects" className="text-lg text-gray-600 hover:text-gray-900">
            Projects
          </Link>
          <Link href="/#contact" className="text-lg text-gray-600 hover:text-gray-900">
            Contact
          </Link>
          <button
            onClick={handleDownload}
            className="text-lg text-gray-600 hover:text-gray-900 transition"
          >
            Resume
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-800 text-3xl focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-72 h-full bg-white shadow-md transform transition-transform duration-500 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-5 border-b">
          <span className="text-xl font-semibold text-gray-800">Menu</span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-800 text-3xl focus:outline-none"
            aria-label="Close Menu"
          >
            <FiX />
          </button>
        </div>
        <div className="px-6 py-5 flex flex-col gap-5 items-start">
          <Link
            href="/#projects"
            onClick={() => setIsOpen(false)}
            className="block w-full text-xl text-gray-600 hover:text-gray-900"
          >
            Projects
          </Link>
          <Link
            href="/#contact"
            onClick={() => setIsOpen(false)}
            className="block w-full text-xl text-gray-600 hover:text-gray-900"
          >
            Contact
          </Link>
          <button
            onClick={() => {
              handleDownload();
              setIsOpen(false);
            }}
            className="block w-full text-xl text-gray-600 hover:text-gray-900 transition text-left"
          >
            Resume
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </nav>
  );
}
