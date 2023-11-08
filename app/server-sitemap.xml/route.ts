import { client } from "@/lib/client";
import { findOpportunities } from "@/lib/queries";
import { ISitemapField, getServerSideSitemap } from "next-sitemap";

export async function GET(request: Request) {
  const response = await client.fetch(findOpportunities(10));

  // href={`/opportunity/${opp._id}?type=${category}`}
  // console.log(response.map((x) => x["id"]));
  const jobSiteMap = response["job"].map((job: any): ISitemapField => {
    return {
      loc: `${process.env.SITE_URL}/opportunity/${job._id}?type=job`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 1,
    };
  });
  const skillSiteMap = response["skill"].map((skill: any): ISitemapField => {
    return {
      loc: `${process.env.SITE_URL}/opportunity/${skill._id}?type=skill`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 1,
    };
  });
  const financeSiteMap = response["finance"].map(
    (finance: any): ISitemapField => {
      return {
        loc: `${process.env.SITE_URL}/opportunity/${finance._id}?type=finance`,
        lastmod: new Date().toISOString(),
        changefreq: "daily",
        priority: 1,
      };
    }
  );
  return getServerSideSitemap([
    ...jobSiteMap,
    ...skillSiteMap,
    ...financeSiteMap,
    {
      loc: "https://inlightzambia.com",
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 1,
    },
    {
      loc: "https://inlightzambia.com/about",
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: 1,
    },
    {
      loc: "https://inlightzambia.com/community",
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: 1,
    },
    {
      loc: "https://inlightzambia.com/services",
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: 1,
    },
    {
      loc: "https://www.inlightzambia.com/opportunity?type=job",
      lastmod: new Date().toISOString(),
      changefreq: "always",
      priority: 1,
    },
    {
      loc: "https://www.inlightzambia.com/opportunity?type=skills",
      lastmod: new Date().toISOString(),
      changefreq: "always",
      priority: 1,
    },
    {
      loc: "https://www.inlightzambia.com/opportunity?type=finance",
      lastmod: new Date().toISOString(),
      changefreq: "always",
      priority: 1,
    },
    {
      loc: "https://inlightzambia.com/login",
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: 1,
    },
    {
      loc: "https://inlightzambia.com/register",
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: 1,
    },
    {
      loc: "https://inlightzambia.com/forgot-password",
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: 1,
    },
  ]);
}
