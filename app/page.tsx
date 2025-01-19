"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Wrench, Clock, Shield, Phone, 
  CheckCircle, Star, Users, Timer,
  Droplet, Home as HomeIcon, Building,
  ChevronUp, ChevronDown, X
} from "lucide-react";
import { useState, useEffect } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";

export default function HomePage() {
  const [expandedCards, setExpandedCards] = useState<number[]>([]);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showCallbackModal, setShowCallbackModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [callbackForm, setCallbackForm] = useState({
    name: '',
    phone: '',
    issue: '',
    preferredTime: '',
    otherIssue: '',
    address: ''
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 640px)').matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleCardExpansion = (index: number) => {
    setExpandedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleCallClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowCallModal(true);
  };

  const handleCallbackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowCallbackModal(true);
  };

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate data before sending
      if (!callbackForm.name || !callbackForm.phone || !callbackForm.issue || !callbackForm.preferredTime) {
        toast.error('Please fill in all required fields');
        return;
      }

      const data = {
        name: callbackForm.name,
        phone: callbackForm.phone,
        service: callbackForm.issue,
        message: `Preferred Time: ${callbackForm.preferredTime}${callbackForm.address ? `\nAddress: ${callbackForm.address}` : ''}${callbackForm.otherIssue ? `\nAdditional Details: ${callbackForm.otherIssue}` : ''}`,
        email: 'callback@request.com' // Placeholder email for callback requests
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const text = await response.text();
      let result;
      
      try {
        result = JSON.parse(text);
      } catch (e) {
        console.error('Failed to parse response:', text);
        throw new Error('Invalid server response');
      }

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      if (result.success) {
        toast.success('Callback request sent successfully! We will contact you soon.');
        setCallbackForm({
          name: '',
          phone: '',
          issue: '',
          preferredTime: '',
          otherIssue: '',
          address: ''
        });
        setShowCallbackModal(false);
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to send message. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="overflow-hidden">
      {/* Callback Request Modal */}
      {showCallbackModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
            <button 
              onClick={() => setShowCallbackModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Request a Call Back</h3>
              <p className="text-gray-600 mt-2">Fill out the form and we'll call you back as soon as possible</p>
            </div>
            <form onSubmit={handleCallbackSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  value={callbackForm.name}
                  onChange={(e) => setCallbackForm({...callbackForm, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[--primary-blue]"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  value={callbackForm.phone}
                  onChange={(e) => setCallbackForm({...callbackForm, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[--primary-blue]"
                  required
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address (Optional)</label>
                <input
                  type="text"
                  id="address"
                  value={callbackForm.address}
                  onChange={(e) => setCallbackForm({...callbackForm, address: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[--primary-blue]"
                  placeholder="Full address including postcode"
                />
              </div>
              <div>
                <label htmlFor="issue" className="block text-sm font-medium text-gray-700 mb-1">Plumbing Issue</label>
                <select
                  id="issue"
                  value={callbackForm.issue}
                  onChange={(e) => setCallbackForm({...callbackForm, issue: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[--primary-blue]"
                  required
                >
                  <option value="">Select an issue</option>
                  <option value="blocked-drain">Blocked Drain</option>
                  <option value="burst-pipe">Burst Pipe</option>
                  <option value="hot-water">Hot Water Issues</option>
                  <option value="leak">Leak Detection</option>
                  <option value="other">Other</option>
                </select>
              </div>
              {callbackForm.issue === 'other' && (
                <div>
                  <label htmlFor="otherIssue" className="block text-sm font-medium text-gray-700 mb-1">Please Describe Your Issue</label>
                  <textarea
                    id="otherIssue"
                    value={callbackForm.otherIssue}
                    onChange={(e) => setCallbackForm({...callbackForm, otherIssue: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[--primary-blue] min-h-[80px] resize-y"
                    placeholder="Please describe your plumbing issue..."
                    required
                  />
                </div>
              )}
              <div>
                <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-1">Preferred Call Time</label>
                <select
                  id="preferredTime"
                  value={callbackForm.preferredTime}
                  onChange={(e) => setCallbackForm({...callbackForm, preferredTime: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[--primary-blue]"
                  required
                >
                  <option value="">Select preferred time</option>
                  <option value="asap">As Soon As Possible</option>
                  <option value="morning">Morning (8am - 12pm)</option>
                  <option value="afternoon">Afternoon (12pm - 5pm)</option>
                  <option value="evening">Evening (5pm - 8pm)</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-[--primary-blue] text-white py-3 rounded-md hover:bg-blue-600 transition-colors font-medium mt-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Sending...
                  </>
                ) : (
                  'Submit Request'
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Call Confirmation Modal */}
      {showCallModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 relative">
            <button 
              onClick={() => setShowCallModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-[--primary-red]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Emergency Plumber</h3>
              <p className="text-gray-600 mb-6">Would you like to call our emergency plumbing service now?</p>
              <div className="flex flex-col gap-3">
                {isMobile ? (
                  <a 
                    href="tel:07934888628"
                    className="bg-[--primary-red] text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    Call 07934 888 628
                  </a>
                ) : (
                  <div className="flex items-center justify-center gap-2 bg-[--primary-red] text-white px-6 py-3 rounded-lg font-medium">
                    <Phone className="w-5 h-5 flex-shrink-0" />
                    <input
                      type="text"
                      value="07934 888 628"
                      readOnly
                      className="bg-transparent text-center focus:outline-none cursor-text w-full"
                      onClick={(e) => e.currentTarget.select()}
                    />
                  </div>
                )}
                <button 
                  onClick={() => setShowCallModal(false)}
                  className="text-gray-600 hover:text-gray-800 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <Navigation onCallClick={handleCallClick} />

      {/* Add padding to account for fixed header */}
      <div className="pt-20 sm:pt-32">
        {/* Hero Section */}
        <section className="hero-section relative text-white py-12 sm:py-16 md:py-24 min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex items-center">
          {/* Background Image and Overlay */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#051c2c]/95 via-[#051c2c]/90 to-[#051c2c]/85 z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#051c2c]/50 to-transparent z-10" />
            <img 
              src="/hero-bg.jpeg" 
              alt="Emergency Plumbing Services" 
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="container mx-auto px-4 relative z-20">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
                24/7 <span className="text-[--primary-red]">Emergency</span> Plumber
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6">
                Aim to be there within 60 Minutes • Licensed & Insured
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {isMobile ? (
                  <Button className="bg-[--primary-red] hover:bg-red-500 text-white text-base sm:text-lg md:text-xl w-full sm:w-auto px-4 sm:px-8 py-3 sm:py-5" onClick={() => window.location.href = 'tel:07934888628'}>
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                    Call Now: 07934 888 628
                  </Button>
                ) : (
                  <Button className="bg-[--primary-red] hover:bg-red-500 text-white text-base sm:text-lg md:text-xl w-full sm:w-auto px-4 sm:px-8 py-3 sm:py-5" onClick={handleCallClick}>
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                    Call Now: 07934 888 628
                  </Button>
                )}
                <Button 
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-base sm:text-lg md:text-xl w-full sm:w-auto px-4 sm:px-8 py-3 sm:py-5"
                  onClick={handleCallbackClick}
                >
                  Request a Call Back
                </Button>
              </div>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl opacity-90">
                Blocked Drains • Burst Pipes • Hot Water • All Emergency Repairs
              </p>
            </div>
          </div>
        </section>


        {/* Service Cards */}
        <section className="relative -mt-8 sm:-mt-12 md:-mt-20 pb-6 sm:pb-8 md:pb-16 px-4 z-30">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-8">
              <Card className="bg-white p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow relative z-30">
                <div className="flex flex-col items-start">
                  <HomeIcon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[--primary-blue] mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2">Residential Plumbing</h3>
                  <p className="text-sm sm:text-base text-gray-600">Complete home plumbing solutions for all your needs</p>
                </div>
              </Card>
              <Card className="bg-white p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow relative z-30">
                <div className="flex flex-col items-start">
                  <Wrench className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[--primary-blue] mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2">Emergency Repairs</h3>
                  <p className="text-sm sm:text-base text-gray-600">24/7 emergency plumbing service when you need it most</p>
                </div>
              </Card>
              <Card className="bg-white p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow relative z-30">
                <div className="flex flex-col items-start">
                  <Droplet className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[--primary-blue] mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2">Drain Services</h3>
                  <p className="text-sm sm:text-base text-gray-600">Professional drain cleaning and maintenance solutions</p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8 sm:py-10 md:py-16 bg-white relative px-4">
          <div className="container mx-auto relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-8">
              {[
                {
                  value: "15+",
                  label: "Years Experience",
                  icon: Clock,
                  description: "Trusted local plumbers since 1993"
                },
                {
                  value: "15k+",
                  label: "Jobs Completed",
                  icon: CheckCircle,
                  description: "Successfully resolved plumbing issues"
                },
                {
                  value: "24/7",
                  label: "Emergency Response",
                  icon: Phone,
                  description: "Always available when you need us"
                },
                {
                  value: "98%",
                  label: "Customer Satisfaction",
                  icon: Star,
                  description: "Consistently exceeding expectations"
                }
              ].map((stat, index) => (
                <div key={index} className="group relative">
                  <div className="bg-gradient-to-br from-[--primary-blue] to-blue-600 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    <div className="bg-white/10 rounded-md sm:rounded-lg p-2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center mb-2 sm:mb-3 md:mb-4">
                      <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm sm:text-base md:text-lg font-semibold text-white/90 mb-1 sm:mb-2">
                      {stat.label}
                    </div>
                    <p className="text-xs sm:text-sm text-white/80">
                      {stat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Banner */}
        <section className="relative h-[500px] sm:h-[500px] overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-10000 hover:scale-110"
            style={{
              backgroundImage: `url('/Home-plumbing.jpg')`,
              backgroundPosition: '50% 30%'
            }}
          />
          {/* Improved overlay system for better mobile appearance */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-[--primary-blue]/40 to-transparent" />
          <div className="absolute inset-0 bg-black/20" />
          
          {/* Content */}
          <div className="relative h-full container mx-auto px-4 flex items-center">
            <div className="max-w-2xl py-8 sm:py-0">
              <div className="bg-black/40 backdrop-blur-[2px] p-6 rounded-xl border border-white/5 shadow-lg">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
                  Plumbing Emergency?<br />
                  <span className="text-[--primary-red] drop-shadow-lg">60 Minute Response Time</span>
                </h2>
                <p className="text-lg sm:text-xl text-white mb-6 sm:mb-8 leading-relaxed">
                  When disaster strikes, every minute counts. Our emergency plumbers are on standby 24/7.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-[--primary-red] hover:bg-red-600 text-white w-full sm:w-auto shadow-lg" onClick={handleCallClick}>
                    <Phone className="w-5 h-5 mr-2" />
                    Emergency Call: 07934 888 628
                  </Button>
                </div>
                {/* Trust Indicators */}
                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                  <div className="flex items-center bg-white/5 backdrop-blur-[2px] px-3 py-1.5 rounded-lg border border-white/10">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white mr-2" />
                    <span className="text-white text-sm sm:text-base">Licensed & Insured</span>
                  </div>
                  <div className="flex items-center bg-white/5 backdrop-blur-[2px] px-3 py-1.5 rounded-lg border border-white/10">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white mr-2" />
                    <span className="text-white text-sm sm:text-base">24/7 Service</span>
                  </div>
                  <div className="flex items-center bg-white/5 backdrop-blur-[2px] px-3 py-1.5 rounded-lg border border-white/10">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-white mr-2" />
                    <span className="text-white text-sm sm:text-base">5-Star Rated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-12 sm:py-20 bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50 relative px-4">
          <div className="container mx-auto relative">
            <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-16">
              <h4 className="text-xs sm:text-sm font-semibold text-[--primary-blue] uppercase tracking-wide mb-2 sm:mb-3">Available 24/7</h4>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-6 bg-gradient-to-r from-[--primary-blue] to-blue-600 bg-clip-text text-transparent">
                Our Services
              </h2>
              <p className="text-base sm:text-xl text-gray-700 leading-relaxed">
                Fast response emergency plumbing services. Fixed prices.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {[
                {
                  title: "Emergency Call-Outs",
                  icon: Phone,
                  description: "60-minute response time for all emergency plumbing issues. Available 24/7. Our expert team is ready to handle any plumbing emergency, from burst pipes to severe leaks. We prioritize urgent calls and aim to prevent further damage to your property."
                },
                {
                  title: "Blocked Drains",
                  icon: Droplet,
                  description: "Fast drain unblocking with high-pressure jetting. CCTV surveys available for tough blockages. We use the latest equipment to identify and clear blockages quickly. Our comprehensive drain cleaning service ensures long-lasting results."
                },
                {
                  title: "Burst Pipes",
                  icon: Timer,
                  description: "Immediate response to burst pipes. We prevent water damage and restore your plumbing fast. Our team is equipped with advanced leak detection tools and repair equipment. We'll minimize damage and get your water flowing safely again."
                },
                {
                  title: "Leak Detection",
                  icon: Shield,
                  description: "Non-invasive leak detection using thermal imaging. We find and fix hidden leaks quickly. Our advanced technology helps locate leaks without damaging your property. We can detect leaks in walls, under floors, and in hard-to-reach places."
                },
                {
                  title: "Hot Water Systems",
                  icon: Wrench,
                  description: "Emergency hot water repairs and replacements. Get your hot water back today. We service and repair all types of hot water systems. From electric to gas, tankless to storage, we ensure you have reliable hot water when you need it."
                },
                {
                  title: "General Plumbing",
                  icon: HomeIcon,
                  description: "From tap repairs to complete bathroom installations. Professional service guaranteed. We handle all aspects of residential plumbing, including maintenance, repairs, and new installations. Our work is fully guaranteed for your peace of mind."
                }
              ].map((service, index) => (
                <Card 
                  key={index} 
                  className="group relative overflow-hidden bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 border border-gray-100 shadow-md"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[--primary-blue] to-blue-600 group-hover:w-2 transition-all duration-300" />
                  <div className="p-3 sm:p-4 md:p-6 relative">
                    <div className="bg-gradient-to-br from-[--primary-blue]/10 to-[--primary-blue]/5 rounded-lg p-2 sm:p-3 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center mb-2 sm:mb-3 md:mb-4 transition-all duration-300 group-hover:bg-[--primary-blue]/20">
                      {service.icon && <service.icon className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[--primary-blue] transition-transform duration-300" />}
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1.5 sm:mb-2 text-gray-900 group-hover:text-[--primary-blue] transition-colors duration-300 line-clamp-1">
                      {service.title}
                    </h3>
                    <div className="flex flex-col gap-2">
                      <p className={`text-xs sm:text-sm md:text-base text-gray-700 leading-tight sm:leading-relaxed transition-all duration-300 md:h-auto ${expandedCards.includes(index + 100) ? 'h-auto' : 'h-[60px]'} md:overflow-visible overflow-hidden`}>
                        {service.description}
                      </p>
                      <button 
                        onClick={() => toggleCardExpansion(index + 100)}
                        className="text-[--primary-blue] hover:text-blue-700 text-sm font-medium flex items-center gap-1 mt-1 md:hidden"
                      >
                        {expandedCards.includes(index + 100) ? (
                          <>Show Less <ChevronUp className="w-4 h-4" /></>
                        ) : (
                          <>Read More <ChevronDown className="w-4 h-4" /></>
                        )}
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* CTA Banner */}
            <div className="mt-8 sm:mt-16 bg-gradient-to-r from-[--primary-blue] to-blue-600 rounded-xl sm:rounded-2xl p-6 sm:p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent_50%)]" />
              <div className="relative z-10 flex flex-col items-center text-center sm:text-left sm:flex-row justify-between gap-6 sm:gap-8">
                <div className="text-white max-w-2xl">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">
                    Need Emergency Plumbing Service?
                  </h3>
                  <p className="text-white/90 text-base sm:text-lg">
                    Our team is available 24/7 for all your emergency plumbing needs
                  </p>
                </div>
                <Button size="lg" className="bg-white text-[--primary-blue] hover:bg-white/90 text-lg w-full sm:w-auto px-8 shadow-lg" onClick={handleCallClick}>
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Our Process Section */}
        <section className="py-6 sm:py-12 md:py-20 bg-gradient-to-br from-[--primary-blue] via-blue-600 to-blue-700 relative overflow-hidden px-4">
          {/* Background Design Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-10 top-10 w-32 sm:w-72 h-32 sm:h-72 bg-white/5 rounded-full blur-2xl"></div>
            <div className="absolute -left-10 bottom-10 w-32 sm:w-72 h-32 sm:h-72 bg-[--primary-red]/20 rounded-full blur-2xl"></div>
          </div>

          <div className="container mx-auto relative">
            <div className="text-center mb-4 sm:mb-8 md:mb-16">
              <h4 className="text-white/80 text-xs sm:text-sm font-semibold uppercase tracking-wide mb-2">HOW WE WORK</h4>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 text-white">
                Your Emergency Is Our Priority
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto">
                Aim to be at your door in 60 minutes or less
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 md:gap-8 relative">
              {[
                {
                  title: "Contact Us",
                  icon: Phone,
                  description: "Call our 24/7 emergency line. We'll respond immediately to your plumbing emergency.",
                  status: "Available 24/7",
                  statusIcon: Clock
                },
                {
                  title: "Swift Arrival",
                  icon: Timer,
                  description: "Our team arrives within 1 hour, fully equipped to handle any plumbing issue.",
                  status: "1 Hour Response",
                  statusIcon: CheckCircle
                },
                {
                  title: "Problem Solved",
                  icon: Wrench,
                  description: "We diagnose and fix the issue efficiently, with a satisfaction guarantee.",
                  status: "100% Guaranteed",
                  statusIcon: Shield
                }
              ].map((step, index) => (
                <div key={index} className={`relative group ${index === 2 ? 'col-span-2 md:col-span-1 max-w-[250px] md:max-w-none mx-auto md:mx-0' : ''}`}>
                  <div className="bg-black/20 rounded-lg sm:rounded-xl p-3 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 border border-white/10">
                    <div className="relative flex flex-col items-center md:items-start">
                      <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-8 h-8 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg border border-white/30 shadow-lg">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="bg-white/5 w-10 h-10 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mb-3 sm:mb-6 border border-white/10">
                        <step.icon className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
                      </div>
                    </div>
                    <div className="text-center md:text-left">
                      <h3 className="text-base sm:text-xl font-bold mb-1 sm:mb-4 text-white">{step.title}</h3>
                      <p className="text-xs sm:text-base text-white/80 mb-2 sm:mb-4">
                        {step.description}
                      </p>
                      <div className="flex items-center text-white font-medium text-xs sm:text-base mt-2 justify-center md:justify-start">
                        <span className="mr-2">{step.status}</span>
                        <step.statusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Areas Section */}
        <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-gray-100 via-white to-blue-50 relative px-4">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white" />
          
          <div className="container mx-auto relative">
            <div className="relative">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-12 text-gray-900">
                Areas We Cover
              </h2>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-8">
              {["Hertfordshire", "Bedfordshire", "Cambridgeshire", "North London"].map((area) => (
                <div key={area} className="bg-white rounded-xl p-4 sm:p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-200/80 shadow-sm group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[--primary-blue]/5 via-[--primary-blue]/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <h3 className="relative z-10 font-semibold text-gray-900 group-hover:text-[--primary-blue] transition-colors duration-300">{area}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white px-4">
          <div className="container mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h4 className="text-xs sm:text-sm font-semibold text-[--primary-blue] uppercase tracking-wide mb-2">What Our Customers Say</h4>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
                Trusted by Homeowners Across the Region
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                Real stories from real customers who experienced our emergency plumbing service
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <Card className="p-4 sm:p-6 md:p-8 bg-white hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col h-full">
                  <div className="flex text-yellow-400 mb-3 sm:mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 italic">
                    "When our kitchen pipe burst at 2 AM, flooding the entire ground floor, I was in panic mode. Called these guys and they arrived within 45 minutes! Not only did they stop the leak quickly, but they also helped minimise the water damage. Their emergency response saved us thousands in potential repairs. The price was surprisingly reasonable for such a late-night call-out. Absolute lifesavers!"
                  </p>
                  <div className="flex items-center mt-auto">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[--primary-blue] to-blue-400 rounded-full mr-4 overflow-hidden">
                      <img 
                        src="/Testimonial-1.png" 
                        alt="Sarah Thompson" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-base sm:text-lg">Sarah Thompson</div>
                      <div className="text-sm text-gray-500">Hertfordshire Homeowner</div>
                      <div className="flex items-center mt-1 text-sm text-[--primary-blue]">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>45min Response Time</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6 md:p-8 bg-white hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col h-full">
                  <div className="flex text-yellow-400 mb-3 sm:mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 italic">
                    "Had a serious leak in our bathroom that was starting to seep through to the ceiling below. Called multiple plumbers but these guys were the only ones who could come immediately. They fixed the issue in under an hour and their pricing was transparent - no hidden fees or surprises. They even helped clean up afterward! Professional, fast, and affordable. Couldn't ask for better service."
                  </p>
                  <div className="flex items-center mt-auto">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[--primary-blue] to-blue-400 rounded-full mr-4 overflow-hidden">
                      <img 
                        src="/Testimonial-2.png" 
                        alt="Mark Richards" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-base sm:text-lg">Mark Richards</div>
                      <div className="text-sm text-gray-500">Bedfordshire Resident</div>
                      <div className="flex items-center mt-1 text-sm text-[--primary-blue]">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        <span>Fixed First Visit</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-8 sm:mt-10 text-center">
              <Button className="bg-[--primary-red] hover:bg-red-500 text-white text-base sm:text-lg w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4" onClick={handleCallClick}>
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Get Emergency Help Now
              </Button>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}