"use client";
import {useEffect, useState} from "react";
import CTA from "@/components/CTA";
import YTEmbed from "@/components/YTEmbed";
import axios from "axios";

export default async function Community() {

  const [videos, setVideos] = useState([]);

  function chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  useEffect(() => {
    axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`).then((response) => {
      setVideos([chunkArray(response.data.items, 2)]);
    }).catch((e) => {
      alert("Something went wrong");
    })
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
          <YTEmbed testimonials={videos} />
        </div>
      </div>

      <div className="mx-auto max-w-7xl pb-0 md:pb-32">
        <CTA
          title="Get Approved"
          company={false}
          description="Browse through a list of services"
        />
      </div>
    </div>
  );
}
