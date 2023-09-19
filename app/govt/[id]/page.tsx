import axios from "axios";

import Link from "next/link";
import { PROGRAM_DATA_URL } from "../../api";

export default async function Detail({ params: { id } }) {
  const program = (await axios.get(PROGRAM_DATA_URL(id))).data.payload;

  return (
    <div className="container mx-auto max-w-7xl my-8">
      <section className="bg-white p-8 rounded-xl shadow-md">
        <a className="mb-4" href="https://www.napsa.co.zm/" target="_blank">
          <img
            className="mb-3 mt-3 img-fluid"
            src={program.logo_uri}
            alt="pro-1"
            width={300}
          />
        </a>
        <div className="sm:columns-2 columns-1">
          <div>
            <video src={program.video_uri} controls width={"100%"} />
            <h3 className="text-4xl font-bold my-4">How To Access</h3>
            <p className="">{program.description}</p>
          </div>
          <div className="mt-8">
            <Link
              href={program.link_uri}
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
