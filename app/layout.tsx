import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Envirotech Plumbing | 24/7 Emergency Plumber Hertfordshire & London',
  description: 'Professional 24/7 emergency plumbing services in Hertfordshire, Bedfordshire, Cambridgeshire & North London. 60-minute response time, licensed & insured plumbers. Expert solutions for burst pipes, leaks, and blocked drains.',
  keywords: 'emergency plumber, 24/7 plumber, plumber Hertfordshire, plumber Bedfordshire, plumber Cambridgeshire, plumber North London, burst pipes, blocked drains, leak detection, emergency plumbing services',
  authors: [{ name: 'Envirotech Plumbing' }],
  openGraph: {
    title: 'Envirotech Plumbing | 24/7 Emergency Plumber Hertfordshire & London',
    description: 'Professional 24/7 emergency plumbing services in Hertfordshire, Bedfordshire, Cambridgeshire & North London. 60-minute response time, licensed & insured plumbers.',
    type: 'website',
    locale: 'en_GB',
    url: 'https://envirotech-plumbing.co.uk',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  verification: {
    google: 'your-google-verification-code', // You'll need to add your actual Google verification code
  },
  alternates: {
    canonical: 'https://envirotech-plumbing.co.uk',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          id="schema-markup"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "PlumbingService",
              "name": "Envirotech Plumbing",
              "image": "https://envirotech-plumbing.co.uk/hero-bg.jpeg",
              "@id": "https://envirotech-plumbing.co.uk",
              "url": "https://envirotech-plumbing.co.uk",
              "telephone": "02036335504",
              "priceRange": "££",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday"
                  ],
                  "opens": "09:00",
                  "closes": "17:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Saturday",
                    "Sunday"
                  ],
                  "description": "Emergency Service Only"
                }
              ],
              "areaServed": ["Hertfordshire", "Bedfordshire", "Cambridgeshire", "North London"],
              "availableService": [
                {
                  "@type": "Service",
                  "name": "Emergency Plumbing",
                  "description": "24/7 emergency plumbing services with 60-minute response time"
                },
                {
                  "@type": "Service",
                  "name": "Blocked Drains",
                  "description": "Professional drain unblocking and CCTV surveys"
                },
                {
                  "@type": "Service",
                  "name": "Burst Pipes",
                  "description": "Emergency burst pipe repairs and water damage prevention"
                },
                {
                  "@type": "Service",
                  "name": "Leak Detection",
                  "description": "Non-invasive leak detection using thermal imaging"
                },
                {
                  "@type": "Service",
                  "name": "Hot Water Systems",
                  "description": "Emergency hot water repairs and installations"
                },
                {
                  "@type": "Service",
                  "name": "General Plumbing",
                  "description": "Complete home plumbing solutions and maintenance"
                }
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Emergency Plumbing Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Emergency Call Out"
                    },
                    "availability": "https://schema.org/InStock",
                    "areaServed": ["Hertfordshire", "Bedfordshire", "Cambridgeshire", "North London"]
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}