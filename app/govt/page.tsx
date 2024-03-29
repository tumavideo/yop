import Title from "@/components/Title";
import axios from "axios";
import { PROGRAM_URL } from "../api";

export default async function Govt() {
  const program = (await axios.get(PROGRAM_URL(0))).data.payload;

  return (
    <section id="programs">
      <div className="container">
        <Title text={"Govt Programs"} />
        <div className="row">
          {program.map((program) => (
            <div className="col-md-4">
              <a href={`/govt/${program._id}`}>
                <img
                  className="img-fluid"
                  src={program.cover_uri}
                  alt="govt-1"
                />
              </a>
              <a href={`${program.link_uri}`} target="_blank">
                <img
                  className="mt-3 img-fluid w-50"
                  src={program.logo_uri}
                  alt={`pro-${program._id}`}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
