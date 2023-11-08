import { urlFor } from "@/lib/client";
import dayjs from "dayjs";
import { Metadata } from "next";
import { JobPosting, WebPage, WithContext } from "schema-dts";

export const layoutSeo: Metadata = {
  metadataBase: new URL("https://inlightzambia.com"),
  title: "InLight Zambia",
  description:
    "Government Programs, Jobs, Skills Development & Finance Opportunities",
  openGraph: {
    type: "website",
    title: "InLight Zambia",
    description:
      "Government Programs, Jobs, Skills Development & Finance Opportunities",
    url: "https://www.inlightzambia.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "InLight Zambia",
    description:
      "Government Programs, Jobs, Skills Development & Finance Opportunities",
  },
};

export const homeJsonLd: WithContext<WebPage> = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "InLight Zambia | Government Programs, Jobs, Skills Development & Finance Opportunities",
  description:
    "Empower your future with InLight Zambia – Your gateway to discover government initiatives, job openings, skill-building resources, and financial opportunities in Zambia. Unleash your potential today!",
  url: "https://inlightzambia.com",
  image: "https://inlightzambia.com/_next/static/media/logo-c.4b129f3c.png",
  breadcrumb: [
    {
      "@type": "BreadcrumbList",
      "@id": "https://inlightzambia.com",
      url: "https://inlightzambia.com",
      name: "Home",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://inlightzambia.com/opportunities?type=job",
      name: "Jobs",
      url: "https://inlightzambia.com/opportunities?type=job",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://inlightzambia.com/opportunities?type=job",
      name: "About",
      url: "https://inlightzambia.com/about",
    },
  ],
};

export const jobSeo = (opp): Metadata => {
  return {
    title: `Inlight Zambia | ${opp.title || opp.position}`,
    description: `Apply for the ${opp.position} role on Inlight Zambia`,
    openGraph: {
      title: opp.position,
      description: `Apply for the ${opp.position} role  on Inlight Zambia`,
      url: `https://inlightzambia.com/opportunity/${opp._id}?type=job`,
      images:
        "https://inlightzambia.com/_next/static/media/logo-c.4b129f3c.png",
    },
    twitter: {
      title: opp.position,
      description: `Apply for the ${opp.position} role on Inlight Zambia!`,
      images:
        "https://inlightzambia.com/_next/static/media/logo-c.4b129f3c.png",
    },
  };
};

export const jobJsonLd = (opp): WithContext<JobPosting> => {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: opp.title || opp.position,
    description: `<p>${opp.description.replace(/\n/g, " ")}</p>`,
    identifier: {
      "@type": "PropertyValue",
      name: opp.companyRef?.name,
      value: opp._id,
    },
    datePosted: dayjs(opp.closingDate).format("YYYY-MM-DD"),
    validThrough: dayjs("2017-03-18T00:00").format("YYYY-MM-DDTHH:mm"),
    hiringOrganization: {
      "@type": "Organization",
      name: opp.companyRef?.name,
      sameAs: opp.companyRef?.website,
      logo: urlFor(opp.companyRef?.logo?.asset),
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: opp.location,
        addressCountry: "ZM",
      },
    },
  };
};
