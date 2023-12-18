"use client";

import { useSearchParams } from "next/navigation";
import { urlFor } from "../lib/client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function Opportunity({ opp }) {
  const searchParams = useSearchParams();
  const category = searchParams.get("type");

  return (
    <div key={opp._id} className="col-span-1 divide-y divide-gray-200">
      {/* <div className="bg-white shadow-md rounded-lg mb-3"> */}
      <a
        href={`/opportunity/${opp._id}?type=${category}`}
        className="cursor-pointer"
      >
        <div className="border border-slate-200 min-h-full rounded-lg p-5">
          <div className="flex">
            <div className="h-20 w-20 my-auto mr-3">
              {opp.companyRef?.logo && (
                <img
                  className="w-full object-contain min-h-0 h-full hover:opacity-80"
                  src={urlFor(opp.companyRef?.logo?.asset)}
                  alt="govt-1"
                />
              )}
            </div>
            <div className="my-auto">
              <h5 className="text-xl font-semibold line-clamp-1">
                {(opp.position || opp.title).split(/\s+/, 7).join(" ")}
              </h5>
              <h6 className="text-gray-600 line-clamp-1">
                {opp.companyRef?.company}
              </h6>
            </div>
          </div>
          <p className="text-gray-700 line-clamp-4 mt-3 cursor-text">
            {opp.description || opp.responsibilities}
          </p>
          <div className="flex place-content-between mt-6 space-x-2">
            <h3 className="font-normal text-gray-500 hover:text-gray-600 cursor-default">
              {dayjs(opp._createdAt).fromNow()}
            </h3>
            {category !== "service" && (
              <p className="text-green-700 hover:underline hover:text-green-800">
                See more
              </p>
            )}
          </div>
        </div>
      </a>
    </div>
  );
}
