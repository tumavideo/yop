import axios from "axios";

import Carousel from "@/components/Carousel";
import Feature from "@/components/Feature";
import Hero from "@/components/Hero";

import { client, urlFor } from "@/lib/client";
import { findOpportunities } from "@/lib/queries";
import { BANNER_URL, PROGRAM_URL } from "./api";

export default async function Home() {
  const data = await client.fetch(findOpportunities(5));
  const { banner } = data;

  const [bannerData, programData] = await Promise.all([
    axios.get(BANNER_URL),
    axios.get(PROGRAM_URL(0)),
  ]).catch((error) => {
    return [];
  });

  const banners = bannerData?.data?.payload || [];
  const programs = programData?.data?.payload || [];

  return (
    <>
      <Hero />
      <div className="container mx-auto my-8 max-w-7xl">
        <Carousel
          slides={banners
            .map((b) => b.img)
            .concat(urlFor(banner[0].image?.asset).url())}
        />
      </div>
      {programs.map((program, index) => (
        <Feature flip={index % 2} program={program} />
      ))}
    </>
  );
}
