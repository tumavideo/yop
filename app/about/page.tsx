import assets from "@/assets";

const About = () => {
  return (
    <div className="bg-white">
      <div className="container px-4 mx-auto pt-10 space-y-12 md:space-y-0 md:flex-row max-w-7xl">
        <div className="flex">
          <img className="w-auto mx-auto" src={assets.jumper.src} alt="logo" />
        </div>
        <div className="mx-auto md:w-3/4">
          <h1
            className="text-center font-bold text-[50px] mb-5"
            style={{ lineHeight: 1.2 }}
          >
            About InLight Zambia
          </h1>
          <p className="font-normal text-[18px] text-gray-500 leading-8 text-center">
            We are excited to introduce InLight Zambia, an informative platform
            that gives government, private sector and civil society a place
            highlight jobs, skills and funding opportunities, and for Zambians
            to access them. We post jobs, skills programs, and leads to
            financial aid as well as up-to-date news, success stories,
            insightful facts, and in-depth information about various Zambian
            programs all under one umbrella.
          </p>
        </div>
      </div>

      <div
        className="container flex flex-col px-4 mx-auto mt-10 space-y-12 md:space-y-0 md:flex-row max-w-7xl"
        style={{ marginTop: 160 }}
      >
        <div className="flex space-y-12 md:w-1/2 order-last sm:order-first mt-20 md:mt-0">
          <img className="w-auto" src={assets.question.src} alt="logo" />
        </div>

        <div className="flex flex-col md:w-1/2 my-auto">
          <div className="my-auto">
            <h1
              className="font-bold text-[50px] mb-5"
              style={{ lineHeight: 1.2 }}
            >
              Why InLight Zambia?
            </h1>
            <p className="font-normal text-[18px] text-gray-500 leading-8">
              InLight Zambia seeks to create a pathway for fostering economic
              growth, social progress, and sustainable development. By raising
              awareness within the community, we aim to increase engagement,
              improve public perception, and contribute to building a prosperous
              and thriving future for all those in Zambia, especially our youth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
