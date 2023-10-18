import Breadcrumbs from "@/components/Breadcrumbs";
import Form from "@/components/Form";
import { WideSkyScraper } from "@/components/ads";
import { client, urlFor } from "@/lib/client";
import { findOpportunities } from "@/lib/queries";
import { capitalizeFirstLetter } from "@/utils";

import Adsense from "@/components/Adsense";
import dayjs from "dayjs";
import { ApplyNow } from "./apply-now";

export default async function Opportunity({
  params: { id },
  searchParams: { type },
}) {
  let opp = await client.fetch(findOpportunities(3000));
  opp = opp[type].find((f) => f._id === id);

  const pages = [
    {
      name: `${
        type === "finance" ? "Funding" : capitalizeFirstLetter(type) + "s"
      }`,
      href: `/opportunity?type=${type}`,
      current: false,
    },
    { name: opp.title, href: "#", current: true },
  ];

  return (
    <div className="bg-gray-100 pb-10">
      <div className="bg-white pb-5">
        <div className="mx-auto max-w-6xl">
          <Adsense />
        </div>
      </div>
      <Breadcrumbs pages={pages} />
      <div className="flex flex-col sm:flex-row max-w-6xl gap-4 mx-auto">
        <div className="md:w-2/3 container mx-auto">
          <div className="my-6">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex my-auto mb-5">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  {opp.title || opp.position}
                </h1>
              </div>
              <div className="grid grid-cols-1">
                <div>
                  {opp.description && (
                    <div>
                      <h3 className="text-xl font-bold text-black">
                        Description
                      </h3>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: opp.description.replace(/\n/g, "<br>"),
                        }}
                      ></p>
                    </div>
                  )}

                  {opp.location && (
                    <div className="mt-10">
                      <h3 className="text-xl font-bold text-black">Location</h3>
                      <p>{opp.location}</p>
                    </div>
                  )}

                  {opp.closingDate && (
                    <div className="mt-10">
                      <h3 className="text-xl font-bold text-black">
                        Closing Date
                      </h3>
                      <p>{dayjs(opp.closingDate).format("MMMM D, YYYY")}</p>
                    </div>
                  )}

                  {opp.responsibilities && (
                    <div className="mt-10">
                      <h3 className="text-xl font-bold text-black">
                        Responsibilities
                      </h3>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: opp.responsibilities.replace(/\n/g, "<br>"),
                        }}
                      ></p>
                    </div>
                  )}

                  {opp.qualifications && (
                    <div className="mt-10">
                      <h3 className="text-xl font-bold text-black">
                        Qualifications
                      </h3>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: opp.qualifications.replace(/\n/g, "<br>"),
                        }}
                      ></p>
                    </div>
                  )}

                  {opp.experience && (
                    <div className="mt-10">
                      <h3 className="text-xl font-bold text-black">
                        Experience and Competencies
                      </h3>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: opp.experience.replace(/\n/g, "<br>"),
                        }}
                      ></p>
                    </div>
                  )}

                  {opp.enableApply ? (
                    <ApplyNow opp={opp} />
                  ) : (
                    <div className="mt-10">
                      <a
                        className="px-5 py-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg cursor-pointer hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        href={opp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Apply Now
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {opp === "apply" && opp.enableApply && (
                <>
                  <h3 className="text-xl font-bold">Application Form</h3>
                  <Form />
                </>
              )}
            </div>
          </div>
        </div>

        <div className="md:w-1/3 container mx-auto">
          <div className="my-6">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div>
                <div className="flex flex-col justify-start items-center py-4">
                  <div className="h-30 w-30 my-auto mb-5">
                    {opp.companyRef?.logo && (
                      <img
                        className="w-full object-contain min-h-0 h-full"
                        src={urlFor(opp.companyRef?.logo?.asset)}
                        alt="Company Logo"
                      />
                    )}
                  </div>

                  <h3 className="text-xl font-bold ml-4">
                    {opp.companyRef?.company}
                  </h3>
                </div>
                <div className="rounded-md">
                  <p>{opp.companyRef?.bio}</p>
                  {opp.companyRef?.website && (
                    <p className="my-8 text-center">
                      <a
                        className="px-5 py-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg cursor-pointer hover:bg-red-700 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        href={opp.companyRef?.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Website
                      </a>
                    </p>
                  )}
                </div>
              </div>
              {opp === "apply" && opp.enableApply && (
                <>
                  <h3 className="text-xl font-bold text-black">
                    Application Form
                  </h3>
                  <Form />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
