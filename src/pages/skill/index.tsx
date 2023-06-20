import Header from "../../components/layout/Header";
import Opportunity from "../../components/Opportunity";
import Subscribe from "../../components/layout/Subscribe";
import Footer from "../../components/layout/Footer";
import { findOpportunities } from "../../lib/queries";
import { client } from "../../lib/client";

export default function Skill({ skill }) {
  return (
    <div>
      <Header />

      <section id="opportunities">
        <div className="container">
          {skill.length > 0 && (
            <>
              <Opportunity title="Skills" opps={skill} skill={true} />
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
    props: { skill: opportunities.skill },
  };
};
