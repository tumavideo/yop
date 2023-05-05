import React from "react";
import Header from "../components/layout/Header";
import Subscribe from "../components/layout/Subscribe";
import Footer from "../components/layout/Footer";
import { findJobs } from "../lib/queries";
import { client, urlFor } from "../lib/client";

export default function Job({ jobs }) {
  return (
    <div>
      <Header />

      <section id="opportunities">
        <div className="container">
          <div className="flag-badge d-flex mb-5">
            <img src="assets/images/__flag.svg" alt="zambia rise logo" />
            <h1 className="my-auto">Opportunities</h1>
          </div>

          <div className="row">
            {jobs.map((job) => (
              <div className="col-md-2 col-6 text-center mb-5">
                {job.companyRef?.logo && (
                  <img
                    style={{ height: 60 }}
                    className="img-fluid"
                    src={urlFor(job.companyRef?.logo?.asset)}
                    alt="govt-1"
                  />
                )}
                <h2>{job.company}</h2>
                <h3>{job.position}</h3>
                <a href={`/application?jobId=${job._id}`} target="_blank">
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Subscribe />
      <Footer />
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = findJobs();
  const jobs = await client.fetch(query);

  return {
    props: { jobs },
  };
};
