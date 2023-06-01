import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import programs from "@/lib/programs";
import Title from "@/components/Title";

export default function Govt() {
  return (
    <>
      <Header />
      <section id="programs">
        <div className="container">
          <Title text={"Govt Programs"} />

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
