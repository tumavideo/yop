import axios from "axios";

import Carousel from "@/components/Carousel";
import Feature from "@/components/Feature";
import Hero from "@/components/Hero";
import { client, urlFor } from "../lib/client";
import { findOpportunities, getTopCompanies } from "../lib/queries";
import { BANNER_URL, POST_URL, PROGRAM_URL, TESTIMONY_URL } from "./api";

const ContentNA = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: 200,
      border: "1px solid #ccc",
      backgroundColor: "#f5f5f5",
      color: "#777",
      fontSize: 18,
      textAlign: "center",
    }}
  >
    Content not available
  </div>
);

export default async function Home() {
  const data = await client.fetch(findOpportunities("5"));
  const topCompanies = await client.fetch(getTopCompanies());
  const { banner, job } = data;

  const [bannerData, postData, programData, testimonyData] = await Promise.all([
    axios.get(BANNER_URL),
    axios.get(POST_URL(0)),
    axios.get(PROGRAM_URL(0)),
    axios.get(TESTIMONY_URL(0)),
  ]).catch((error) => {
    return [];
  });

  const banners = bannerData?.data?.payload || [];
  const post = postData?.data?.payload || [];
  const programs = programData?.data?.payload || [];
  const testimony = testimonyData?.data?.payload || [];
  const jobs = job;

  return (
    <>
      {/* <LogoCloud companies={topCompanies} /> */}
      <Hero />
      <div className="container mx-auto my-8 max-w-7xl">
        <Carousel
          slides={
            banners
              .map((b) => b.img)
              .concat(urlFor(banner[0].image?.asset).url())
          }
        />
      </div>
      {programs.map((program, index) => (
        <Feature flip={index % 2} index={index} program={program} />
      ))}
    </>
  );
}
