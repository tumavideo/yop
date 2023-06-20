import Header from "../../components/layout/Header";
import Opportunity from "../../components/Opportunity";
import Subscribe from "../../components/layout/Subscribe";
import Footer from "../../components/layout/Footer";
import { findOpportunities } from "../../lib/queries";
import { client } from "../../lib/client";

export default function Funding({ finance }) {
  return (
    <div>
      <Header />

      <section id="opportunities">
        <div className="container">
          {finance.length > 0 && (
            <>
              <Opportunity title="Funding" opps={finance} loan={true} />
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
  const query = findOpportunities("3000");
  const opportunities = await client.fetch(query);

  return {
    props: { finance: opportunities.finance },
  };
};
