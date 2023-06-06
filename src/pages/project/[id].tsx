import axios from "axios";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import Title from "../../components/Title";
import { PROJECT_DATA_URL } from "../../api";
import Subscribe from "../../components/layout/Subscribe";

export default function Detail({ project }) {
  return (
    <div id="project-detail">
      <Header />
      <section className="container mt-5 mb-5">
        <Title text={"Project"} />
        <h1 style={{marginBottom: 20}}>{project.title}</h1>
        <p>{project.description}</p>
        <div className="row">
          {project.photos.map((item) => {
            return(
              <img
                className="col-md-4 mb-3 mt-3 img-fluid"
                src={item}
                alt="pro-1"
              />
            )
          })}
        </div>
      </section>
      <Subscribe/>
      <Footer />
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const id = context.params.id;

  const project = (await axios.get(PROJECT_DATA_URL(id))).data.payload;

  return {
    props: { project },
  };
};
