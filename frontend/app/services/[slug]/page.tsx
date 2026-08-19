import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetail from "@/components/sections/ServiceDetail";
import { getServiceBySlug, services } from "@/data/services";
import { SITE } from "@/config/site";
import Process from "@/components/sections/Process";
import { serviceProcess } from "@/data/serviceProcess";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

// Pre-renders /services/business-websites, /services/web-applications, etc.
// Adding a service only requires a new entry in data/services.ts.
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

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
    },
    twitter: {
      title: `${service.breadcrumbLabel} | ${SITE.name}`,
      description: service.shortDescription,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  // Unknown slug (e.g. /services/foo) falls back to the existing app/not-found.tsx.
  if (!service) {
    notFound();
  }

  return (
    <>
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
