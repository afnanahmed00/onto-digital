import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetail from "@/components/sections/ServiceDetail";
import { getServiceBySlug } from "@/services/services";
import { SITE } from "@/config/site";
import { SEO } from "@/config/seo";
import Process from "@/components/sections/Process";
import { serviceProcess } from "@/data/serviceProcess";
import JsonLd from "@/components/seo/JsonLd";
import { serviceSchema, serviceBreadcrumbSchema } from "@/lib/seo/schema";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

// No generateStaticParams: services are looked up by slug from MongoDB on
// request (cached for 60s per getServiceBySlug's `next.revalidate`), so a
// service an admin adds or renames shows up under /services/{slug} without
// a redeploy — see services/services.ts.
export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: service.breadcrumbLabel,
    description: service.shortDescription,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.breadcrumbLabel} | ${SITE.name}`,
      description: service.shortDescription,
      url: `/services/${service.slug}`,
      images: [SEO.ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.breadcrumbLabel} | ${SITE.name}`,
      description: service.shortDescription,
      images: [SEO.ogImage.url],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  // Unknown slug, or an unpublished service (the backend 404s both cases
  // identically for anonymous callers), falls back to app/not-found.tsx.
  if (!service) {
    notFound();
  }

  return (
    <>
      <JsonLd data={serviceSchema(service)} />
      <JsonLd data={serviceBreadcrumbSchema(service)} />
      <ServiceDetail service={service} />
      <Process
              badge="OUR PROCESS"
              heading={
                <>
                  HOW WE
                  <br />
                  DELIVER
                  <br />
                  RESULTS
                </>
              }
              description="A transparent and collaborative workflow that ensures every project is delivered on time, with quality and measurable business impact."
              steps={serviceProcess}
            />
    </>
  );
}
