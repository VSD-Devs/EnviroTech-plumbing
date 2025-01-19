"use client";

import { Button } from "@/components/ui/button";
import { Menu, Phone } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface NavigationProps {
  onCallClick: (e: React.MouseEvent) => void;
}

export default function Navigation({ onCallClick }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white py-3 sm:py-6 fixed w-full z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img 
              src="/envirotech-logo.jpg" 
              alt="Envirotech Plumbing & Drainage" 
              className="h-14 sm:h-24 w-auto header-logo"
            />
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-gray-50 text-[--primary-blue] hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Navigation */}
          <nav className={`
            fixed md:relative top-[65px] md:top-0 left-0 w-full md:w-auto 
            bg-gradient-to-br from-white/95 via-white/95 to-blue-50/95 md:bg-transparent 
            shadow-lg md:shadow-none
            backdrop-blur-md md:backdrop-blur-none
            transition-all duration-300 ease-in-out
            ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0 pointer-events-none'} 
            md:translate-y-0 md:opacity-100 md:pointer-events-auto
            md:flex md:items-center md:space-x-8
            p-4 md:p-0
            border-t md:border-t-0 border-gray-100
          `}>
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <Link 
                href="/" 
                className="text-gray-900 md:text-gray-900 hover:text-[--primary-blue] md:hover:text-blue-700 font-medium text-base sm:text-base px-4 py-2.5 md:px-0 md:py-0 rounded-lg hover:bg-blue-50/50 md:hover:bg-transparent transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="text-gray-900 md:text-gray-900 hover:text-[--primary-blue] md:hover:text-blue-700 font-medium text-base sm:text-base px-4 py-2.5 md:px-0 md:py-0 rounded-lg hover:bg-blue-50/50 md:hover:bg-transparent transition-colors"
              >
                About Us
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-900 md:text-gray-900 hover:text-[--primary-blue] md:hover:text-blue-700 font-medium text-base sm:text-base px-4 py-2.5 md:px-0 md:py-0 rounded-lg hover:bg-blue-50/50 md:hover:bg-transparent transition-colors"
              >
                Contact Us
              </Link>
              <Button className="bg-[--primary-red] hover:bg-red-600 text-white text-base w-full md:w-auto shadow-md hover:shadow-lg transition-all duration-300 hidden md:flex" onClick={onCallClick}>
                <Phone className="w-4 h-4 mr-2" />
                Call Now: 07934 888 628
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
} 