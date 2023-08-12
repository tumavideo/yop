import Title from "@/components/Title";

const About = () => {
  return (
    <section id="intro">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img
              className="img-fluid mb-5 mb-md-0"
              src="assets/images/jump.png"
              alt="zambia rise man rising"
            />
          </div>

          <div className="col-md-6 my-auto">
            <Title text={"About Zambia Rise"} />
            <p>
              We are excited to introduce Zambia Rise, acomprehensive online
              platform designed to empower Zambians by showcasing
              opportunities, initiatives, and achievements driven by the New
              Dawn Government. Our mission is to inform, inspire, and engage
              citizens by providing up-to-date news, success stories,
              insightful facts, and in-depth information about various
              government programs.
            </p>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-6 my-auto">
            <Title text={"WHY Zambia Rise"} />
            <p>
              Zambia Rise is essential for fostering economic growth, social
              progress, and sustainable development in our country. By raising
              awareness of the opportunities and initiatives created by the
              New Dawn government, we aim to increase citizen engagement,
              improve public perception, and contribute to building a
              prosperous and thriving future for all citizens in Zambia.
            </p>
          </div>

          <div className="col-md-6">
            <img
              className="img-fluid mt-5 mb-md-0"
              src="assets/images/question.png"
              alt="zambia rise man rising"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
