"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Phone, Mail, MapPin, Clock, 
  MessageSquare, Send, Building
} from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const handleCallClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = 'tel:02036335504';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const form = e.target as HTMLFormElement;
      const formElements = form.elements as HTMLFormControlsCollection;
      
      const data = {
        name: (formElements.namedItem('name') as HTMLInputElement)?.value || '',
        email: (formElements.namedItem('email') as HTMLInputElement)?.value || '',
        phone: (formElements.namedItem('phone') as HTMLInputElement)?.value || '',
        service: (formElements.namedItem('service') as HTMLSelectElement)?.value || '',
        message: (formElements.namedItem('message') as HTMLTextAreaElement)?.value || '',
      };

      // Validate data before sending
      if (!data.name || !data.email || !data.phone || !data.service || !data.message) {
        toast.error('Please fill in all fields');
        return;
      }

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
        toast.success('Message sent successfully! We will get back to you soon.');
        form.reset();
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
    <div className="overflow-hidden">
      <Navigation onCallClick={handleCallClick} />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="hero-section relative text-white py-20 sm:py-32 md:py-40 min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex items-center">
          {/* Background Image and Overlay */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#051c2c]/90 to-[#051c2c]/80 z-10" />
            <div className="absolute inset-0 bg-[#051c2c]/30 z-10" />
            <img 
              src="/hero-bg.jpeg" 
              alt="Emergency Plumbing Services" 
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-20">
            <div className="max-w-3xl mx-auto text-center">
              <h4 className="text-xs sm:text-sm md:text-base font-semibold text-blue-200 uppercase tracking-wider mb-3 sm:mb-4">24/7 Emergency Service</h4>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight">
                Need Emergency Plumbing Help?
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-6 sm:mb-8 leading-relaxe
              d">
                We're here for you 24/7. Call us now for immediate assistance.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <Button 
                  size="lg" 
                  className="bg-[--primary-red] hover:bg-red-500 text-white text-base sm:text-lg py-4 sm:py-6 px-6 sm:px-8"
                  onClick={handleCallClick}
                >
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                  02036335504
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="relative -mt-10 sm:-mt-20 lg:-mt-32 pb-20 px-4 z-30">
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Contact Form */}
              <Card className="p-6 sm:p-8 md:p-10 shadow-2xl bg-white/95 backdrop-blur-sm">
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-[#051c2c]">Send Us a Message</h2>
                  <p className="text-gray-600 text-base sm:text-lg">We'll get back to you as soon as possible.</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Smith"
                        required
                        className="h-12"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="02036335504"
                        required
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                      Service Required
                    </label>
                    <select
                      id="service"
                      name="service"
                      className="w-full rounded-md border border-gray-300 bg-white h-12 px-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                      defaultValue="emergency"
                      required
                    >
                      <option value="emergency">Emergency Plumbing</option>
                      <option value="drainage">Drainage Services</option>
                      <option value="maintenance">General Maintenance</option>
                      <option value="installation">New Installation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Please describe your plumbing issue..."
                      required
                      className="min-h-[150px] resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-[--primary-blue] hover:bg-blue-600 h-12 text-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Card>

              {/* Contact Information */}
              <div className="space-y-6 sm:space-y-8">
                <Card className="p-6 sm:p-8 bg-gradient-to-br from-[#051c2c] to-[#0a2942] text-white">
                  <h2 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6">Contact Information</h2>
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-white/10 rounded-lg p-3">
                        <Phone className="w-6 h-6 text-[--primary-red]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Phone</h3>
                        <p className="text-gray-300 mb-1">24/7 Emergency Service</p>
                        <a href="tel:02036335504" className="text-[--primary-red] hover:text-red-400 font-medium text-lg">
                          02036335504
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-white/10 rounded-lg p-3">
                        <Mail className="w-6 h-6 text-[--primary-red]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Email</h3>
                        <p className="text-gray-300 mb-1">Send us an email</p>
                        <a href="mailto:support@envirotech-plumbing.co.uk" className="text-[--primary-red] hover:text-red-400 font-medium break-all">
                          support@envirotech-plumbing.co.uk
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-white/10 rounded-lg p-3">
                        <Clock className="w-6 h-6 text-[--primary-red]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Hours</h3>
                        <div className="space-y-1 text-gray-300">
                          <p>
                            <span className="font-medium text-[--primary-red]">Emergency: 24/7</span>
                          </p>
                          <p>Office: Mon-Fri 9-5</p>
                          <p>Sat-Sun: Emergency Only</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Service Areas */}
                <Card className="p-6 sm:p-8 bg-gradient-to-br from-[#051c2c] to-[#0a2942] text-white">
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="w-6 h-6 text-[--primary-red]" />
                    <h2 className="text-xl sm:text-2xl font-bold text-white">Areas We Cover</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: "Hertfordshire", icon: Building },
                      { name: "Bedfordshire", icon: Building },
                      { name: "Cambridgeshire", icon: Building },
                      { name: "North London", icon: Building }
                    ].map((area) => (
                      <div
                        key={area.name}
                        className="flex items-center gap-3 p-4 rounded-lg bg-white/10 hover:bg-white/15 transition-all duration-300 group cursor-pointer"
                      >
                        <div className="p-2 rounded-full bg-white/10">
                          <area.icon className="w-5 h-5 text-[--primary-red]" />
                        </div>
                        <span className="font-medium text-white group-hover:text-[--primary-red] transition-colors duration-300">
                          {area.name}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-sm text-gray-300">
                    Providing expert plumbing services across these regions. Contact us to confirm service availability in your specific location.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
} 