"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Phone, Clock, Shield, Star, 
  Users, Award, Target, Heart,
  CheckCircle, Wrench, Droplet, ChevronUp, ChevronDown
} from "lucide-react";
import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

export default function AboutPage() {
  const [showCallModal, setShowCallModal] = useState(false);
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

  const handleCallClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowCallModal(true);
  };

  const toggleCardExpansion = (index: number) => {
    setExpandedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="overflow-hidden">
      {/* Navigation */}
      <Navigation onCallClick={handleCallClick} />

      {/* Main Content */}
      <main className="pt-24 sm:pt-32">
        {/* Hero Section */}
        <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 md:pb-24">
          {/* Background Image and Overlay */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60 z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/0 z-10" />
            <img 
              src="/Home-plumbing.jpg" 
              alt="Professional plumber working on emergency repairs" 
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-20">
            <div className="max-w-3xl mx-auto text-center">
              <h4 className="text-xs sm:text-sm font-semibold text-blue-200 uppercase tracking-wide mb-3">Plumbers Near You</h4>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white">
                15+ Years Emergency Plumbing Experience
              </h1>
              <p className="text-lg sm:text-xl text-gray-200 mb-8 sm:mb-10">
                Emergency plumbers delivering fast response times across Hertfordshire & London. Available 24/7 for all plumbing emergencies.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-[--primary-red] hover:bg-red-500 text-white" onClick={handleCallClick}>
                  <Phone className="w-5 h-5 mr-2" />
                  02036335504
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                  Our Story
                </h2>
                <p className="text-gray-600 mb-4">
                  With over 15 years of hands-on experience, our master plumbers have solved thousands of emergency plumbing issues across Hertfordshire and London. Our expertise spans everything from complex emergency repairs to advanced diagnostic techniques, ensuring we fix your plumbing emergency right the first time.
                </p>
                <p className="text-gray-600 mb-6">
                  We've built our reputation as we aim to have a 60-minute response times and superior workmanship, becoming the most trusted emergency plumbers in the region. Our team of certified experts is available 24/7, equipped with the latest tools and technology to handle any plumbing emergency, from burst pipes to complex drainage issues.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-[--primary-blue]">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span>Licensed and fully insured professionals</span>
                  </div>
                  <div className="flex items-center text-[--primary-blue]">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span>Fast emergency response guarantee</span>
                  </div>
                  <div className="flex items-center text-[--primary-blue]">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span>Transparent pricing, no hidden fees</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="/About-us.jpg" 
                  alt="Professional Plumbers with Van - EnviroTech Plumbing Team" 
                  className="rounded-lg shadow-xl w-full"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center">
                    <div className="mr-3">
                      <div className="text-3xl font-bold text-[--primary-blue]">15+</div>
                      <div className="text-sm text-gray-600">Years of Service</div>
                    </div>
                    <Award className="w-12 h-12 text-[--primary-blue]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                Our Core Values
              </h2>
              <p className="text-gray-600">
                These principles guide everything we do, ensuring you receive the best possible service
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: Clock,
                  title: "Fast Response",
                  description: "We guarantee a fast response time for all emergency calls, because we know every minute counts."
                },
                {
                  icon: Shield,
                  title: "Reliability",
                  description: "Available 24/7, 365 days a year. When you need us, we'll be there - no exceptions."
                },
                {
                  icon: Target,
                  title: "Expertise",
                  description: "Our team of qualified professionals has the experience to handle any plumbing emergency."
                },
                {
                  icon: Heart,
                  title: "Customer Care",
                  description: "We treat every customer's home as if it were our own, with respect and careful attention."
                },
                {
                  icon: Wrench,
                  title: "Quality Work",
                  description: "Using the latest tools and techniques, we ensure lasting solutions to your plumbing problems."
                },
                {
                  icon: Star,
                  title: "Transparency",
                  description: "Clear communication and upfront pricing - no hidden fees or unexpected charges."
                }
              ].map((value, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="bg-gradient-to-br from-[--primary-blue]/10 to-[--primary-blue]/5 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-[--primary-blue]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <div className="flex flex-col gap-2">
                    <p className={`text-gray-600 text-sm sm:text-base transition-all duration-300 md:h-auto ${expandedCards.includes(index) ? 'h-auto' : 'h-[60px]'} md:overflow-visible overflow-hidden`}>
                      {value.description}
                    </p>
                    <button 
                      onClick={() => toggleCardExpansion(index)}
                      className="text-[--primary-blue] hover:text-blue-700 text-sm font-medium flex items-center gap-1 mt-1 md:hidden"
                    >
                      {expandedCards.includes(index) ? (
                        <>Show Less <ChevronUp className="w-4 h-4" /></>
                      ) : (
                        <>Read More <ChevronDown className="w-4 h-4" /></>
                      )}
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-r from-[--primary-blue] to-blue-600 text-white p-8 sm:p-12">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                  Need Emergency Plumbing Service?
                </h2>
                <p className="text-xl opacity-90 mb-8">
                  Our team is ready to help 24/7
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button size="lg" className="bg-[--primary-red] hover:bg-red-600 text-white font-semibold" onClick={handleCallClick}>
                    <Phone className="w-5 h-5 mr-2" />
                    02036335504
                  </Button>
                  <Button size="lg" className="bg-white hover:bg-gray-100 text-[--primary-blue] font-semibold">
                    Contact Us
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
} 