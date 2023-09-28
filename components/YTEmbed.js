"use client";

import YouTube from "react-youtube";
import assets from "@/assets";
import Adsense from "@/components/Adsense";

const YouTubePlayer = ({ videoId }) => {
  const opts = {
    height: "180",
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
                      className="bg-white p-0 pb-4 ring-1 ring-gray-200"
                    >
                      <blockquote className="text-gray-900">
                        <YouTubePlayer videoId={testimonial.video_id} />
                      </blockquote>
                      <figcaption className="mt-6 flex items-center gap-x-4 pl-4">
                        <div className="flex">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.75C11.6873 2.75 11.3784 2.76549 11.0741 2.79571C10.6619 2.83663 10.2946 2.53566 10.2537 2.12348C10.2127 1.71129 10.5137 1.34397 10.9259 1.30304C11.2794 1.26795 11.6377 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C11.6377 22.75 11.2794 22.732 10.9259 22.697C10.5137 22.656 10.2127 22.2887 10.2537 21.8765C10.2946 21.4643 10.6619 21.1634 11.0741 21.2043C11.3784 21.2345 11.6873 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM8.68726 2.53181C8.8531 2.91137 8.67984 3.35351 8.30028 3.51935C7.64014 3.80778 7.01992 4.17118 6.45043 4.59894C6.11924 4.84771 5.64909 4.78089 5.40033 4.4497C5.15156 4.11851 5.21838 3.64836 5.54957 3.39959C6.21099 2.90278 6.93185 2.48032 7.69972 2.14482C8.07929 1.97898 8.52143 2.15224 8.68726 2.53181ZM4.4497 5.40033C4.78089 5.64909 4.84771 6.11924 4.59894 6.45043C4.17118 7.01992 3.80778 7.64014 3.51935 8.30028C3.35351 8.67984 2.91137 8.8531 2.53181 8.68726C2.15224 8.52143 1.97898 8.07929 2.14482 7.69972C2.48032 6.93185 2.90278 6.21099 3.39959 5.54957C3.64836 5.21838 4.11851 5.15156 4.4497 5.40033ZM2.12348 10.2537C2.53566 10.2946 2.83663 10.6619 2.79571 11.0741C2.76549 11.3784 2.75 11.6873 2.75 12C2.75 12.3127 2.76549 12.6216 2.79571 12.9259C2.83663 13.3381 2.53566 13.7054 2.12348 13.7463C1.71129 13.7873 1.34397 13.4863 1.30304 13.0741C1.26795 12.7206 1.25 12.3623 1.25 12C1.25 11.6377 1.26795 11.2794 1.30304 10.9259C1.34397 10.5137 1.71129 10.2127 2.12348 10.2537ZM2.53181 15.3127C2.91137 15.1469 3.35351 15.3202 3.51935 15.6997C3.80778 16.3599 4.17118 16.9801 4.59894 17.5496C4.84771 17.8808 4.78089 18.3509 4.4497 18.5997C4.11851 18.8484 3.64836 18.7816 3.39959 18.4504C2.90278 17.789 2.48032 17.0682 2.14482 16.3003C1.97898 15.9207 2.15224 15.4786 2.53181 15.3127ZM5.3994 19.5495C5.64821 19.2183 6.11837 19.1516 6.44953 19.4004C7.01927 19.8284 7.63979 20.1921 8.30028 20.4806C8.67984 20.6465 8.8531 21.0886 8.68726 21.4682C8.52143 21.8478 8.07929 22.021 7.69972 21.8552C6.93144 21.5195 6.21023 21.0968 5.54852 20.5996C5.21736 20.3508 5.1506 19.8807 5.3994 19.5495ZM12.9035 9.03431L12.8747 9.01506C12.4953 8.76215 12.1683 8.5441 11.8939 8.39541C11.6193 8.24658 11.2799 8.09869 10.8957 8.12163C10.3849 8.15213 9.91306 8.40465 9.60436 8.81273C9.37218 9.11965 9.30694 9.48412 9.27844 9.79518C9.24997 10.1059 9.24998 10.499 9.25 10.9549L9.25 10.9896V13.0104L9.25 13.0451C9.24998 13.501 9.24997 13.8941 9.27844 14.2048C9.30694 14.5159 9.37218 14.8804 9.60436 15.1873C9.91306 15.5953 10.3849 15.8479 10.8957 15.8784C11.2799 15.9013 11.6193 15.7534 11.8939 15.6046C12.1683 15.4559 12.4953 15.2378 12.8747 14.9849L12.9035 14.9657L14.4191 13.9553L14.446 13.9374L14.446 13.9374C14.7568 13.7302 15.0313 13.5472 15.2396 13.3793C15.4551 13.2055 15.6838 12.9838 15.8137 12.6704C15.9917 12.2412 15.9917 11.7588 15.8137 11.3296C15.6838 11.0162 15.4551 10.7945 15.2396 10.6207C15.0313 10.4528 14.7568 10.2698 14.446 10.0626L14.4191 10.0447L12.9035 9.03431Z" fill="#22272F"/>
                          </svg>
                          <div className="font-semibold ml-2">
                            {testimonial.title}
                          </div>
                          {/* <div className="text-gray-600">{`@${testimonial._id}`}</div> */}
                        </div>
                      </figcaption>
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
