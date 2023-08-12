import Title from "@/components/Title";
import axios from "axios";

import Link from "next/link";
import { PROGRAM_DATA_URL } from "../../api";

export default async function Detail({ params: { id } }) {
  const program = (await axios.get(PROGRAM_DATA_URL(id))).data.payload;

  return (
    <section className="container mt-5 mb-5">
      <Title text={"Govt Program"} />
      <a className="mb-4" href="https://www.napsa.co.zm/" target="_blank">
        <img
          className="mb-3 mt-3 img-fluid"
          src={program.logo_uri}
          alt="pro-1"
          width={300}
        />
      </a>
      <p>{program.description}</p>
      <div className="d-flex justify-content-center flex-column">
        <h3 style={{marginBottom: 20, marginTop: 20}}>How To Access</h3>
        <video src={program.video_uri} controls/>
        <div className="d-flex justify-content-center">
          <Link
              href={program.link_uri}
              className="button btn-primary mt-5 __button mb-5"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </section>
  );
}
