"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiDownload, FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu on window resize above md breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const handleDownload = () => {
    window.open("/Resume_VarishSanghvi.pdf", "_blank");
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b w-full">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Brand Name */}
        <Link
          href="/"
          className="text-xl font-semibold text-gray-800 tracking-wide uppercase focus:outline-none"
        >
          <span className="text-sm font-light tracking-widest block leading-tight select-none">
            Code & Creativity
          </span>
          <span className="text-lg font-bold select-none">Varish Sanghvi</span>
        </Link>

        {/* Desktop Navigation (visible on md and up) */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/#projects"
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            Projects
          </Link>
          <Link
            href="/#contact"
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            Contact
          </Link>
          <button
            onClick={handleDownload}
            className="text-gray-600 hover:text-gray-900 transition focus:outline-none"
          >
            Resume
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-800 text-2xl focus:outline-none select-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Side Drawer (fixed overlay) */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-md transform transition-transform duration-500 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="text-lg font-semibold text-gray-800">Menu</span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-800 text-2xl focus:outline-none select-none"
            aria-label="Close Menu"
          >
            <FiX />
          </button>
        </div>
        <div className="px-6 py-4 flex flex-col gap-4 items-start">
          <Link
            href="/#projects"
            onClick={() => setIsOpen(false)}
            className="block w-full text-lg text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            Projects
          </Link>
          <Link
            href="/#contact"
            onClick={() => setIsOpen(false)}
            className="block w-full text-lg text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            Contact
          </Link>
          <button
            onClick={() => {
              handleDownload();
              setIsOpen(false);
            }}
            className="block w-full text-lg text-gray-600 hover:text-gray-900 transition text-left focus:outline-none"
          >
            Resume
          </button>
        </div>
      </div>

      {/* Mobile Background Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </nav>
  );
}