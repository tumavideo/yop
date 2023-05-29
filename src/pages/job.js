import Header from "../components/layout/Header";
import Subscribe from "../components/layout/Subscribe";
import Footer from "../components/layout/Footer";
import { findOpportunities } from "../lib/queries";
import { client, urlFor } from "../lib/client";
import Title from "../components/Title";

const Opportunity = ({ opps, title, loan = false }) => (
  <>
    <Title text={title} />

    <div className="row">
      {opps.map((opp) => (
        <div key={opp._id} className="col-md-2 col-6 text-center mb-5">
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

export default function Job({ opportunities }) {
  return (
    <div>
      <Header />

      <section id="opportunities">
        <div className="container">
          {opportunities.job.length > 0 && (
            <Opportunity title="Jobs" opps={opportunities.job} />
          )}
          {opportunities.finance.length > 0 && (
            <Opportunity
              title="Finance"
              opps={opportunities.finance}
              loan={true}
            />
          )}
          {opportunities.skill.length > 0 && (
            <Opportunity title="Skills" opps={opportunities.skill} />
          )}
        </div>
      </section>

      <Subscribe />
      <Footer />
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = findOpportunities();
  const opportunities = await client.fetch(query);

  return {
    props: { opportunities },
  };
};
