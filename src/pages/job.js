import React, { useState } from "react";
import Header from "../components/layout/Header";
import Subscribe from "../components/layout/Subscribe";
import Footer from "../components/layout/Footer";
import {
  findJobs,
  findMarketplace,
  getCareers,
  getEducation,
  getFunding,
} from "../lib/queries";
import { client, urlFor } from "../lib/client";

let opportunityTypes = ["Job", "Finance", "Career", "Market", "Skills"];

export default function Job({ jobs }) {
  const [selectedOption, setSelectedOption] = useState("All Opportunities");
  const [opportunities, setOpportunities] = useState(jobs);

  const onSelectedItem = async (item) => {
    let query = "";

    setSelectedOption(item);
    switch (item) {
      case "Job":
        query = findJobs();
        setOpportunities(await client.fetch(query));
        break;
      case "Finance":
        query = getFunding();
        setOpportunities(await client.fetch(query));
        break;
      case "Career":
        query = getCareers();
        setOpportunities(await client.fetch(query));
        break;
      case "Market":
        query = findMarketplace();
        setOpportunities(await client.fetch(query));
        break;
      case "Skills":
        query = getEducation();
        setOpportunities(await client.fetch(query));
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Header />

      <section id="opportunities">
        <div className="container">
          <div className="d-flex justify-content-between">
            <div className="flag-badge d-flex mb-5">
              <img src="assets/images/__flag.svg" alt="zambia rise logo" />
              <h1 className="my-auto">Opportunities</h1>
            </div>
            <div className="dropdown">
              <button
                className="btn btn-success dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {selectedOption}
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                {opportunityTypes.map((opp) => (
                  <li>
                    <a
                      className="dropdown-item"
                      href="javascript:void(0)"
                      onClick={onSelectedItem.bind(null, opp)}
                    >
                      {opp}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="row">
            {opportunities.map((opp) => (
              <div className="col-md-2 col-6 text-center mb-5">
                {opp.companyRef?.logo && (
                  <img
                    style={{ height: 60 }}
                    className="img-fluid"
                    src={urlFor(opp.companyRef?.logo?.asset)}
                    alt="govt-1"
                  />
                )}
                <h2>{opp.company}</h2>
                <h3>{opp.position}</h3>
                <a
                  href={`/application?${
                    selectedOption === "Finance" ? "loanId" : "jobId"
                  }=${opp._id}`}
                  target="_blank"
                >
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
