import Breadcrumbs from "@/components/Breadcrumbs";
import Form from "@/components/Form";
import { client, urlFor } from "@/lib/client";
import { findOpportunities } from "@/lib/queries";
import { capitalizeFirstLetter } from "@/utils";

import dayjs from "dayjs";
import Adsense from "@/components/Adsense";
import assets from "@/assets";

export default async function Opportunity({
  params: { id },
  searchParams: { type },
}) {
  let opp = await client.fetch(findOpportunities(3000));
  opp = opp[type].find((f) => f._id === id);

  const pages = [
    {
      name: `${type === "finance" ? "Funding" : capitalizeFirstLetter(type) + 's'}`,
      href: `/opportunity?type=${type}`,
      current: false,
    },
    { name: opp.title, href: "#", current: true },
  ];

  return (
    <div className="bg-gray-100 pb-10">
      <div className="bg-white pb-5">
        <div className="mx-auto max-w-6xl">
          <Adsense/>
        </div>
      </div>
      <Breadcrumbs pages={pages} />
      <div className="flex flex-col sm:flex-row max-w-6xl gap-4 mx-auto">
        <div className="md:w-2/3 container mx-auto">
          <div className="my-6">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex my-auto mb-5">
                <img className="w-auto align-middle" src={assets.flag.src} alt="logo"/>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  {opp.title || opp.position}
                </h1>
              </div>
              <div>
                <div className="grid grid-cols-1">
                  <div>
                    {opp.description && (
                        <div>
                          <h3 className="text-xl font-bold text-orange-400">Description</h3>
                          <p
                              dangerouslySetInnerHTML={{
                                __html: opp.description.replace(/\n/g, "<br>"),
                              }}
                          ></p>
                        </div>
                    )}

                    {opp.closingDate && (
                        <div className="mt-10">
                          <h3 className="text-xl font-bold text-orange-400">Closing Date</h3>
                          <p>{dayjs(opp.closingDate).format("MMMM D, YYYY")}</p>
                        </div>
                    )}

                    {opp.responsibilities && (
                        <div className="mt-10">
                          <h3 className="text-xl font-bold text-orange-400">Responsibilities</h3>
                          <p
                              dangerouslySetInnerHTML={{
                                __html: opp.responsibilities.replace(/\n/g, "<br>"),
                              }}
                          ></p>
                        </div>
                    )}

                    {opp.qualifications && (
                        <div className="mt-10">
                          <h3 className="text-xl font-bold text-orange-400">Qualifications</h3>
                          <p
                              dangerouslySetInnerHTML={{
                                __html: opp.qualifications.replace(/\n/g, "<br>"),
                              }}
                          ></p>
                        </div>
                    )}

                    {opp.experience && (
                        <div className="mt-10">
                          <h3 className="text-xl font-bold text-orange-400">
                            Experience and Competencies
                          </h3>
                          <p
                              dangerouslySetInnerHTML={{
                                __html: opp.experience.replace(/\n/g, "<br>"),
                              }}
                          ></p>
                        </div>
                    )}

                    {opp.location && (
                        <div className="mt-10">
                          <h3 className="text-xl font-bold text-orange-400">Location</h3>
                          <p>{opp.location}</p>
                        </div>
                    )}

                    {opp.link && (
                        <div className="mt-10">
                          <a
                              className="px-5 py-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg cursor-pointer hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
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
              </div>
              {opp === "apply" && opp.enableApply && (
                  <>
                    <h3 className="text-xl font-bold text-orange-400">Application Form</h3>
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
                  {opp.companyRef?.logo && (
                      <img
                          className="max-w-full max-h-64 mb-4"
                          src={urlFor(opp.companyRef?.logo?.asset).url()}
                          alt="Company Logo"
                      />
                  )}

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
                          Visit the Website
                        </a>
                      </p>
                  )}
                </div>
              </div>
              {opp === "apply" && opp.enableApply && (
                  <>
                    <h3 className="text-xl font-bold text-orange-500">Application Form</h3>
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
