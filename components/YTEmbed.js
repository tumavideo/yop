"use client";

import YouTube from "react-youtube";
import assets from "@/assets";
import Adsense from "@/components/Adsense";

const YouTubePlayer = ({ videoId }) => {
  const opts = {
    height: "250",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
    },
  };

  return <YouTube videoId={videoId} opts={opts} />;
};

const featuredTestimonial = {
  body: "Integer id nunc sit semper purus. Bibendum at lacus ut arcu blandit montes vitae auctor libero. Hac condimentum dignissim nibh vulputate ut nunc. Amet nibh orci mi venenatis blandit vel et proin. Non hendrerit in vel ac diam.",
  author: {
    name: "Brenna Goyette",
    handle: "brennagoyette",
    imageUrl:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80",
    logoUrl: "https://tailwindui.com/img/logos/savvycal-logo-gray-900.svg",
  },
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function YTEmbed({ testimonials }) {
  return (
    <div className="relative isolate bg-white pb-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mt-5">
          <Adsense/>
        </div>
        <div className="max-w-xl text-center" style={{marginTop: 100}}>
          <div className="flex my-auto">
            <img className="w-auto align-middle" src={assets.flag.src} alt="logo"/>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Success Stories</h1>
          </div>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-4 text-sm leading-6 text-gray-900 sm:mt-10 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-3">
          {testimonials.map((columnGroup, columnGroupIdx) => (
            <div
              key={columnGroupIdx}
              className="space-y-8 xl:contents xl:space-y-0"
            >
              {columnGroup.map((column, columnIdx) => (
                <div
                  key={columnIdx}
                  className={classNames(
                    (columnGroupIdx === 0 && columnIdx === 0) ||
                    (columnGroupIdx === testimonials.length - 1 &&
                      columnIdx === columnGroup.length - 1)
                      ? "xl:row-span-2"
                      : "xl:row-start-1",
                    "space-y-8"
                  )}
                >
                  {column.map((testimonial) => (
                    <figure
                      key={testimonial._id}
                      className="bg-white p-0 ring-1 ring-gray-200"
                    >
                      <blockquote className="text-gray-900">
                        <YouTubePlayer videoId={testimonial.contentDetails.videoId} />
                      </blockquote>
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
