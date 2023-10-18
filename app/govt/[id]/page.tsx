import { client, urlFor } from "@/lib/client";
import { getProgramById } from "@/lib/queries";
import Link from "next/link";

export default async function Detail({ params: { id } }) {
  const program = await client.fetch(getProgramById(id));

  return (
    <div className="container mx-auto max-w-7xl my-8">
      <section className="bg-white p-8 rounded-xl shadow-md">
        <a className="mb-4" href="https://www.napsa.co.zm/" target="_blank">
          {program.logo?.asset && (
            <img
              className="mb-3 mt-3 img-fluid"
              src={urlFor(program.logo?.asset)}
              alt="pro-1"
              width={300}
            />
          )}
        </a>
        <div className="sm:columns-2 columns-1">
          <div>
            {program.video?.asset && (
              <video
                src={`https://cdn.sanity.io/files/d9p0l1rj/production/${program.video?.asset?._ref.split(
                  "-"
                )[1]}.mp4`}
                controls
                width={"100%"}
              />
            )}
            <h3 className="text-4xl font-bold my-4">How To Access</h3>
            <p className="">{program.description}</p>
          </div>
          <div className="mt-8">
            <Link
              href={program.link}
              className="px-5 py-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg cursor-pointer hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
