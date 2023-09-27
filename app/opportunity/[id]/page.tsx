import Breadcrumbs from "@/components/Breadcrumbs";
import Form from "@/components/Form";
import { client, urlFor } from "@/lib/client";
import { findOpportunities } from "@/lib/queries";
import { capitalizeFirstLetter } from "@/utils";

import dayjs from "dayjs";

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
    <>
      <Breadcrumbs pages={pages} />
      <div className="container mx-auto max-w-6xl">
        <div className="my-6">
          <div className="bg-white p-10 rounded-xl shadow-md">
            <h1 className="text-4xl font-bold mb-3">
              {opp.title || opp.position}
            </h1>
            <hr className="mb-3" />
            <div className="grid sm:grid-cols-2 grid-cols-1">
              <div>
                {opp.description && (
                  <div>
                    <h3 className="text-xl font-bold">Description</h3>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: opp.description.replace(/\n/g, "<br>"),
                      }}
                    ></p>
                  </div>
                )}

                {opp.location && (
                  <div className="mt-3">
                    <h3 className="text-xl font-bold">Location</h3>
                    <p>{opp.location}</p>
                  </div>
                )}

                {opp.closingDate && (
                  <div className="mt-3">
                    <h3 className="text-xl font-bold">Closing Date</h3>
                    <p>{dayjs(opp.closingDate).format("MMMM D, YYYY")}</p>
                  </div>
                )}

                {opp.responsibilities && (
                  <div className="mt-3">
                    <h3 className="text-xl font-bold">Responsibilities</h3>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: opp.responsibilities.replace(/\n/g, "<br>"),
                      }}
                    ></p>
                  </div>
                )}

                {opp.qualifications && (
                  <div className="mt-3">
                    <h3 className="text-xl font-bold">Qualifications</h3>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: opp.qualifications.replace(/\n/g, "<br>"),
                      }}
                    ></p>
                  </div>
                )}

                {opp.experience && (
                  <div className="mt-3">
                    <h3 className="text-xl font-bold">
                      Experience and Competencies
                    </h3>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: opp.experience.replace(/\n/g, "<br>"),
                      }}
                    ></p>
                  </div>
                )}
              </div>
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
                <div className="bg-gray-100 p-4 rounded-md">
                  <p>{opp.companyRef?.bio}</p>
                  {opp.companyRef?.website && (
                    <p className="my-8">
                      Visit our website:{" "}
                      <a
                        className="text-blue-600"
                        href={opp.companyRef?.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {opp.companyRef?.website}
                      </a>
                    </p>
                  )}
                  {opp.link && (
                    <p className="mt-3">
                      <a
                        className="px-5 py-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg cursor-pointer hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        href={opp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Apply on company site
                      </a>
                    </p>
                  )}
                </div>
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
    </>
  );
}
