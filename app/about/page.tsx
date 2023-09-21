import Feature from "@/components/Feature";

const about = [
  {
    _id: 1,
    cover_uri: "assets/images/logo.jpeg",
    alt: "Inlight Zambia man rising",
    name: "About Inlight Zambia",
    description:
      "We are excited to introduce Inlight Zambia, an informative platform that gives government, private sector and civil society a place highlight opportunities, and for Zambians to access them. We post jobs, skills programs, and leads to financial aid as well as up-to-date news, success stories, insightful facts, and in-depth information about various government programs all under one umbrella.",
  },
  {
    _id: 2,
    cover_uri: "assets/images/question.png",
    alt: "Inlight Zambia man asking",
    name: "WHY Inlight Zambia",
    description:
      "Inlight Zambia seeks to create a pathway for fostering economic growth, social progress, and sustainable development. By raising awareness within the community, we aim to increase engagement, improve public perception, and contribute to building a prosperous and thriving future for all those in Zambia, especially our youth.",
  },
];

const About = () => {
  return (
    <>
      {about.map((program, index) => (
        <Feature flip={index % 2} program={program} />
      ))}
    </>
  );
};

export default About;
