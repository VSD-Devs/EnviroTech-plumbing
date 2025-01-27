"use client";

import { Button } from "@/components/ui/button";
import { 
  Wrench, Clock, Shield, Phone, 
  Star, Home as HomeIcon, Mail, MapPin,
  Droplet, Timer, X
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 640px)').matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePhoneClick = (e: React.MouseEvent) => {
    if (!isMobile) {
      e.preventDefault();
      setShowPhoneModal(true);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-[#051c2c] to-[#0a2942] text-white py-12 sm:py-16 px-4 relative">
      {/* Phone Modal */}
      {showPhoneModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 relative">
            <button 
              onClick={() => setShowPhoneModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-[--primary-red]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Emergency Plumber</h3>
              <p className="text-gray-600 mb-6">Our emergency plumbing contact number:</p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-center gap-2 bg-[--primary-red] text-white px-6 py-3 rounded-lg font-medium">
                  <Phone className="w-5 h-5 flex-shrink-0" />
                  <input
                    type="text"
                    value="02036335504"
                    readOnly
                    className="bg-transparent text-center focus:outline-none cursor-text w-full"
                    onClick={(e) => e.currentTarget.select()}
                  />
                </div>
                <button 
                  onClick={() => setShowPhoneModal(false)}
                  className="text-gray-600 hover:text-gray-800 font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto relative">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-6">About Us</h3>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Your trusted emergency plumbing service, available 24/7 across Hertfordshire and London.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-6">Services</h3>
            <ul className="space-y-2.5 sm:space-y-3 text-sm sm:text-base">
              <li className="flex items-center text-white/80 hover:text-white transition-colors">
                <Wrench className="w-4 h-4 mr-2 text-[--primary-red]" />
                Emergency Plumbing
              </li>
              <li className="flex items-center text-white/80 hover:text-white transition-colors">
                <Droplet className="w-4 h-4 mr-2 text-[--primary-red]" />
                Drain Services
              </li>
              <li className="flex items-center text-white/80 hover:text-white transition-colors">
                <Timer className="w-4 h-4 mr-2 text-[--primary-red]" />
                Hot Water Systems
              </li>
              <li className="flex items-center text-white/80 hover:text-white transition-colors">
                <HomeIcon className="w-4 h-4 mr-2 text-[--primary-red]" />
                General Repairs
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-6">Contact</h3>
            <ul className="space-y-2.5 sm:space-y-3 text-sm sm:text-base">
              <li className="flex items-center text-white/80 hover:text-white transition-colors">
                <Phone className="w-4 h-4 mr-2 text-[--primary-red]" />
                {isMobile ? (
                  <a href="tel:02036335504">02036335504</a>
                ) : (
                  <button onClick={handlePhoneClick} className="hover:text-white transition-colors">
                    02036335504
                  </button>
                )}
              </li>
              <li className="flex items-center text-white/80 hover:text-white transition-colors">
                <Mail className="w-4 h-4 mr-2 text-[--primary-red]" />
                support@envirotech-plumbing.co.uk
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-6">Hours</h3>
            <ul className="space-y-2.5 sm:space-y-3 text-sm sm:text-base">
              <li className="flex items-center text-white/80">
                <Clock className="w-4 h-4 mr-2 text-[--primary-red]" />
                <span className="font-medium">Emergency: 24/7</span>
              </li>
              <li className="flex items-center text-white/80">
                <Clock className="w-4 h-4 mr-2 text-white/60" />
                Office: Mon-Fri 9-5
              </li>
              <li className="flex items-center text-white/80">
                <Clock className="w-4 h-4 mr-2 text-white/60" />
                Sat-Sun: Emergency Only
              </li>
            </ul>
          </div>
        </div>
        
        {/* Trust Badges */}
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-white/10">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-12 mb-8">
            <div className="flex items-center text-white/80 hover:text-white transition-colors">
              <Shield className="w-5 h-5 mr-2 text-[--primary-red]" />
              <span className="text-sm">Licensed & Insured</span>
            </div>
            <div className="flex items-center text-white/80 hover:text-white transition-colors">
              <Clock className="w-5 h-5 mr-2 text-[--primary-red]" />
              <span className="text-sm">24/7 Emergency Service</span>
            </div>
            <div className="flex items-center text-white/80 hover:text-white transition-colors">
              <Star className="w-5 h-5 mr-2 text-[--primary-red]" />
              <span className="text-sm">5-Star Rated Service</span>
            </div>
          </div>
          
          <div className="text-center text-sm text-white/60">
            <p>&copy; {new Date().getFullYear()} Envirotech Plumbing & Drainage. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
} 