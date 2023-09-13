import Article from "@/components/Article";
import Feature from "@/components/Feature";
import Filters from "@/components/Filters";
import Nothing from "@/components/Nothing";
import Opportunity from "@/components/Opportunity";
import YTEmbed from "@/components/YTEmbed";
import { client } from "@/lib/client";
import { Database } from "@/lib/database.types";
import { getServices } from "@/lib/queries";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";
import { cookies } from "next/headers";
import { POST_URL, PROGRAM_URL, TESTIMONY_URL } from "../api";

const testimonials = [
  [
    [
      {
        _id: "6461e1a8483ca9a1d6784c01",
        title: "CDF Success Story by FEBBY",
        img_src: "https://i.ytimg.com/vi/d4HxjADnIes/hqdefault.jpg",
        video_id: "d4HxjADnIes",
        createdAt: "2023-05-15T07:39:20.726Z",
        updatedAt: "2023-05-15T07:39:20.726Z",
      },
      {
        _id: "6461e19f483ca9a1d6784bfa",
        title: "CDF Success Story by MOTA",
        img_src: "https://i.ytimg.com/vi/LKBZq6PZ2pE/hqdefault.jpg",
        video_id: "LKBZq6PZ2pE",
        createdAt: "2023-05-15T07:39:11.019Z",
        updatedAt: "2023-05-15T07:39:11.019Z",
      },
    ],
    [
      {
        _id: "6461e191483ca9a1d6784bf3",
        title: "Unza Meal Allowance",
        img_src: "https://i.ytimg.com/vi/HivnhNb50aw/hqdefault.jpg",
        video_id: "HivnhNb50aw",
        createdAt: "2023-05-15T07:38:57.076Z",
        updatedAt: "2023-05-15T07:38:57.076Z",
      },
      {
        _id: "6461e177483ca9a1d6784beb",
        title: "Warthog Investments",
        img_src: "https://i.ytimg.com/vi/wBiL5qqnHTs/hqdefault.jpg",
        video_id: "wBiL5qqnHTs",
        createdAt: "2023-05-15T07:38:31.020Z",
        updatedAt: "2023-05-15T07:38:31.020Z",
      },
    ],
  ],
  [
    [
      {
        _id: "645cb7126540ef3730b91c4d",
        title: "Marketeer Booster Loan",
        img_src: "https://i.ytimg.com/vi/8Hc9dpdelZg/hqdefault.jpg",
        video_id: "8Hc9dpdelZg",
      },
      {
        _id: "645b48a256acc9a18de6c5f0",
        title: "Delivering on Commitments #ZangenaSeason",
        img_src: "https://i.ytimg.com/vi/KA8p760H89U/hqdefault.jpg",
        video_id: "KA8p760H89U",
        createdAt: "2023-05-10T07:32:50.668Z",
        updatedAt: "2023-05-10T07:32:50.668Z",
      },
    ],
  ],
];

export default async function Govt() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const programs = (await axios.get(PROGRAM_URL(0))).data.payload;
  const posts = (await axios.get(POST_URL(0))).data.payload;
  const testimonies = (await axios.get(TESTIMONY_URL(0))).data.payload;
  const services = await client.fetch(getServices(20));

  return (
    <div className="bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto">
        {programs.map((program, index) => (
          <Feature flip={index % 2} index={index} program={program} />
        ))}
        {!session ? (
          <>
            <Filters />
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Opportunity opp={service} service={true} />
              ))}
            </ul>
          </>
        ) : (
          <>
            <Nothing />
          </>
        )}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
          <YTEmbed testimonials={testimonials} />
        </div>
        <Article />
      </div>
    </div>
  );
}
