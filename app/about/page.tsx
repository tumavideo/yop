import Feature from "@/components/Feature";

const about = [
  {
    _id: 0,
    cover_uri: "assets/images/logo.jpeg",
    alt: "Inlight Zambia logo",
    name: "Inlight Zambia",
    description:
      "Inlight\nverb\nTo shine\nSimply put, InLight Zambia represents a mission to shed light on the various opportunities, up-to-date news and information.".replace(
        /\n/g,
        "<br>"
      ),
  },
  {
    _id: 1,
    cover_uri: "assets/images/youth-jump.png",
    alt: "Inlight Zambia man rising",
    name: "About Inlight Zambia",
    description:
      "We are excited to introduce Inlight Zambia, an informative platform that gives government, private sector and civil society a place to post availabile opportunities, and for young people to access them. Our mission is to inform, inspire, and engage the community by providing up-to-date news, success stories, insightful facts, and in-depth information about various government programs.",
  },
  {
    _id: 2,
    cover_uri: "assets/images/question.png",
    alt: "Inlight Zambia man asking",
    name: "WHY Inlight Zambia",
    description:
      "Inlight Zambia seeks to create a pathway for fostering economic growth, social progress, and sustainable development. By raising awareness of the opportunities and initiatives, we aim to increase engagement, improve public perception, and contribute to building a prosperous and thriving future for all those in Zambia.",
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
