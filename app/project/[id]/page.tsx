import Title from "@/components/Title";
import axios from "axios";
import { PROJECT_DATA_URL } from "../../api";

export default async function Detail({ params: { id } }) {
  const project = (await axios.get(PROJECT_DATA_URL(id))).data.payload;

  return (
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
  );
}
