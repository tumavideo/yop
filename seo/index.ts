import { urlFor } from "@/lib/client";
import dayjs from "dayjs";
import { Metadata } from "next";
import { JobPosting, WebPage, WithContext } from "schema-dts";
const seoVariables = {
  title: "InLight Zambia",
  description:
    "Government Programs, Jobs, Skills Development & Finance Opportunities",
  url: "https://www.inlightzambia.com",
  image: "https://inlightzambia.com/_next/static/media/logo-c.4b129f3c.png",
};
export const layoutSeo: Metadata = {
  metadataBase: new URL(seoVariables.url),
  title: seoVariables.title,
  description: seoVariables.description,
  openGraph: {
    type: "website",
    title: seoVariables.title,
    description: seoVariables.description,
  },
  twitter: {
    card: "summary_large_image",
    title: seoVariables.title,
    description: seoVariables.description,
  },
};

export const homeJsonLd: WithContext<WebPage> = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoVariables.title,
  description: seoVariables.description,
  url: seoVariables.url,
  image: seoVariables.image,
  breadcrumb: [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: seoVariables.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Jobs",
          item: `${seoVariables.url}/opportunities?type=job`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          item: `${seoVariables.url}/about`,
        },
      ],
    },
  ],
};
export const jobSeo = (opp): Metadata => {
  return {
    title: `${seoVariables.title} | ${opp.title || opp.position}`,
    description: `Apply for the ${opp.position} role on ${seoVariables.title}!`,
    openGraph: {
      title: opp.position,
      description: `Apply for the ${opp.position} role  on ${seoVariables.title}!`,
      url: `${seoVariables.url}/opportunity/${opp._id}?type=job`,
      images: seoVariables.image,
    },
    twitter: {
      title: opp.position,
      description: `Apply for the ${opp.position} role on ${seoVariables.title}!`,
      images: seoVariables.image,
    },
  };
};

export const jobJsonLd = (opp): WithContext<JobPosting> => {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: opp.position,
    description: `<p>${opp.description.replace(/\n/g, " ")}</p>`,
    identifier: {
      "@type": "PropertyValue",
      name: opp.companyRef?.name,
      value: opp._id,
    },
    datePosted: dayjs(opp._createdAt).format("YYYY-MM-DD"),
    validThrough: dayjs(opp.closingDate).format("YYYY-MM-DDTHH:mm"),
    hiringOrganization: {
      "@type": "Organization",
      name: opp.companyRef?.company,
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
