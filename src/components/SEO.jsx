import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title, 
  description, 
  keywords = "infrastructure, toll plaza management, construction, operations, engineering, Kritisha, India",
  image = "/images/hero_bridge.jpg",
  url = "https://www.kritishainfra.com",
  type = "website",
  noindex = false,
  structuredData = null
}) {
  const siteName = "KRITISHA Infrastructure";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDescription = "Integrated infrastructure, engineering, operations and consultancy solutions for a more connected, sustainable and prosperous India.";
  const finalDescription = description || defaultDescription;

  // Default Organization JSON-LD if no specific structured data is provided
  const orgStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteName,
    "url": url,
    "logo": `${url}/logo.svg`,
    "description": defaultDescription,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Navi Mumbai",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91 93728 23019",
      "contactType": "customer service",
      "areaServed": "IN"
    }
  };

  const finalStructuredData = structuredData || orgStructuredData;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={keywords} />
      
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={finalDescription} />
      <meta property="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
    </Helmet>
  );
}
