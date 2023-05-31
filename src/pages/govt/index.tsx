import React from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

const programs = [
  {
    id: 1,
    banner: "assets/images/pro-1.jpg",
    link: "https://www.napsa.co.zm/",
    logo: "assets/images/pro-logo-2.png",
  },
  {
    id: 2,
    banner: "assets/images/pro-2.jpg",
    link: "https://www.ceec.org.zm/",
    logo: "assets/images/pro-logo-1.png",
  },
  {
    id: 3,
    banner: "assets/images/pro-3.jpg",
    link: "https://www.mlgrd.gov.zm/wp-content/uploads/2022/04/CDF-GUIDELINES-2.pdf",
    logo: "assets/images/pro-logo-3.png",
  },
];

export default function Govt() {
  return (
    <>
      <Header />
      <section id="programs">
        <div className="container">
          <div className="flag-badge d-flex mb-5">
            <img src="assets/images/__flag.svg" alt="zambia rise logo" />
            <h1 className="my-auto">Govt Programs</h1>
          </div>

          <div className="row">
            {programs.map((program) => (
              <div className="col-md-4">
                <a href={`/govt/${program.id}`}>
                  <img
                    className="img-fluid"
                    src={program.banner}
                    alt="govt-1"
                  />
                </a>
                <a href={`${program.link}`} target="_blank">
                  <img
                    className="mt-3 img-fluid w-50"
                    src={program.logo}
                    alt={`pro-${program.id}`}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
