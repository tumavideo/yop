import Header from "../components/layout/Header";
import Opportunity from "../components/Opportunity";
import Subscribe from "../components/layout/Subscribe";
import Footer from "../components/layout/Footer";
import { findOpportunities } from "../lib/queries";
import { client } from "../lib/client";

export default function Funding({ jobs }) {
  return (
    <div>
      <Header />

      <section id="opportunities">
        <div className="container">
          {jobs.length > 0 && (
            <>
              <Opportunity title="Jobs" opps={jobs} />
            </>
          )}
        </div>
      </section>

      <Subscribe />
      <Footer />
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = findOpportunities("30");
  const opportunities = await client.fetch(query);

  return {
    props: { jobs: opportunities.job },
  };
};
