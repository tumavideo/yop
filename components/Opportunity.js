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
      <div className="border border-slate-200 min-h-full rounded-lg shadow-md">
        <div className="lg:flex lg:items-center">
          {opp.companyRef?.logo && (
            <div className="lg:w-4/12 p-4 lg:p-0 flex justify-center items-center">
              <img
                className="max-h-32 max-w-full pl-4"
                src={urlFor(opp.companyRef?.logo?.asset).url()}
                alt="govt-1"
              />
            </div>
          )}
          <div className="lg:w-8/12 p-4">
            <div className="mb-2">
              <h5 className="text-xl font-semibold">
                {(opp.position || opp.title).split(/\s+/, 7).join(" ")}
              </h5>
              <h6 className="text-gray-600">{opp.companyRef?.company}</h6>
              <h3 className="font-semibold text-gray-600">
                {dayjs(opp._createdAt).fromNow()}
              </h3>
            </div>
            <p className="text-gray-700 line-clamp-3">
              {opp.description || opp.responsibilities}
            </p>
            <div className="flex justify-end items-center mt-4 space-x-2">
              {opp.enableApply ||
                (category === "service" && (
                  <a
                    href={`/application?${category}=${opp._id}`}
                    className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
                    data-bs-toggle="modal"
                    data-bs-target="#applyModal"
                  >
                    Apply
                  </a>
                ))}
              {category !== "service" && (
                <a
                  href={`/opportunity/${opp._id}?type=${category}`}
                  className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100"
                >
                  See more
                </a>
              )}
              {/* <Modal /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
