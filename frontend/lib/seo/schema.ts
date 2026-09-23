import { SITE } from "@/config/site";
import { SOCIALS } from "@/config/social";
import type { Service } from "@/data/services";
import type { FAQItem } from "@/components/sections/FAQ";

/**
 * Structured data builders. Every value here is read from existing project
 * config/data (config/site.ts, config/social.ts, the service/FAQ content
 * actually rendered on the page) — nothing here invents business details
 * (opening hours, ratings, price range, a street address) that aren't
 * already present in the project.
 */

const ORGANIZATION_ID = `${SITE.website}/#organization`;
const WEBSITE_ID = `${SITE.website}/#website`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE.name,
    url: SITE.website,
    description: SITE.description,
    email: SITE.email,
    telephone: `+${SITE.phone}`,
    address: SITE.address,
    sameAs: Object.values(SOCIALS).filter(Boolean),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE.website,
    name: SITE.name,
    description: SITE.description,
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE.website}/services/${service.slug}#service`,
    name: service.breadcrumbLabel,
    description: service.shortDescription,
    url: `${SITE.website}/services/${service.slug}`,
    provider: { "@id": ORGANIZATION_ID },
  };
}

export function serviceBreadcrumbSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.website },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${SITE.website}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.breadcrumbLabel,
        item: `${SITE.website}/services/${service.slug}`,
      },
    ],
  };
}

export function faqPageSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
