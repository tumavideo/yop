import { urlFor } from "../lib/client";

import Modal from "@/components/Modal";
import Title from "@/components/Title";

export default function Opportunity({
  opps,
  title,
  loan = false,
  skill = false,
}) {
  return (
    <>
      <Title text={title} />

      <div className="row">
        {opps.map((opp) => (
          <>
            <div key={opp._id} class="col-md-12 col-lg-6">
              <div class="card mb-3">
                <div className="row g-0">
                  {opp.companyRef?.logo && (
                    <div className="col-md-4 d-flex justify-content-center align-items-center">
                      <img
                        style={{ maxWidth: "100%", maxHeight: 240 }}
                        className="card-image p-3"
                        src={urlFor(opp.companyRef?.logo?.asset).url()}
                        alt="govt-1"
                      />
                    </div>
                  )}
                  <div className="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">{opp.position || opp.title}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">
                        {opp.companyRef.company}
                      </h6>
                      <p class="card-text vertical-ellipsis">
                        {opp.description || opp.responsibilities}
                      </p>
                      <div className="d-flex justfy-end align-items-center">
                        <a
                          href={`/application?${loan ? "loanId" : "jobId"}=${
                            opp._id
                          }`}
                          class="btn btn-success text-white"
                          data-bs-toggle="modal"
                          data-bs-target="#applyModal"
                        >
                          Apply
                        </a>
                        <a
                          href={`/${
                            loan ? `funding` : skill ? `skill` : `jobs`
                          }/${opp._id}`}
                          className="px-4"
                        >
                          See more
                        </a>
                        <Modal />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
