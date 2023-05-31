import { urlFor } from "../lib/client";

import Title from "../components/Title";

export default function Opportunity({ opps, title, loan = false }) {
  return (
    <>
      <Title text={title} />

      <div className="row">
        {opps.map((opp) => (
          <div key={opp._id} className="col-md-2 col-sm-12 text-center mb-5">
            {opp.companyRef?.logo && (
              <img
                style={{ height: 60 }}
                className="img-fluid"
                src={urlFor(opp.companyRef?.logo?.asset).url()}
                alt="govt-1"
              />
            )}
            <h2>{opp.companyRef.company}</h2>
            <h3>{opp.position || opp.title}</h3>
            <a
              href={`/application?${loan ? "loanId" : "jobId"}=${opp._id}`}
              target="_blank"
            >
              Apply Now
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
