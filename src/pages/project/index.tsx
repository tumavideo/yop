import Header from "../../components/layout/Header";
import Subscribe from "../../components/layout/Subscribe";
import Footer from "../../components/layout/Footer";
import axios from "axios";
import { PROJECT_URL } from "../../api";

export default function Project({ project }) {
  return (
    <div>
      <Header />
      <section id="project">
        <div className="container">
          <div className="row">
            {project.length > 0 && (
              project.map((item, index) => {
                return(
                  <div key={index} className="col-md-4">
                    <a href={`/project/${item._id}`}>
                      <img className="img-fluid" src={item.photos[0]}  alt="cdf-project"/>
                    </a>
                    <h1>{item.title}</h1>
                    <span>CDF Projects</span>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </section>

      <Subscribe />
      <Footer />
    </div>
  );
}

export const getServerSideProps = async () => {
  const project = (await axios.get(PROJECT_URL(0))).data.payload;

  return {
    props: { project },
  };
};
