import assets from "@/assets";

const About = () => {
  return (
    <>
      <div className="container px-4 mx-auto mt-10 space-y-12 md:space-y-0 md:flex-row max-w-7xl">
        <div className="flex">
          <img className="w-auto mx-auto" src={assets.jumper.src} alt="logo"/>
        </div>
        <div className="mx-auto md:w-3/4">
          <h1 className="text-lg text-center font-bold text-[50px] mb-5" style={{lineHeight: 1.2}}>About Inlight Zambia</h1>
          <p className="font-normal text-[18px] text-gray-500 leading-8 text-center">The National Pension Scheme Act No. 40 of 1996 of the Laws of Zambia provides for investment of funds of the Scheme not immediately required to meet any charges or obligations in a range of assets. The primary aim of the investments is to provide for the benefits of the Sheme. The Authority had its investment guidelines revised in 2017 as per the Investment Guidelines Statutory Instrument (SI) number 19 of 2017.</p>
        </div>
      </div>

      <div className="container flex flex-col px-4 mx-auto mt-10 space-y-12 md:space-y-0 md:flex-row max-w-7xl" style={{marginTop: 160}}>
        <div className="flex space-y-12 md:w-1/2 order-last sm:order-first mt-20 md:mt-0">
          <img className="w-auto" src={assets.question.src} alt="logo"/>
        </div>

        <div className="flex flex-col md:w-1/2 my-auto">
          <div className="my-auto">
            <h1 className="text-lg font-bold text-[50px] mb-5" style={{lineHeight: 1.2}}>Why InLight Zambia?</h1>
            <p className="font-normal text-[18px] text-gray-500 leading-8">The National Pension Scheme Act No. 40 of 1996 of the Laws of Zambia provides for investment of funds of the Scheme not immediately required to meet any charges or obligations in a range of assets. The primary aim of the investments is to provide for the benefits of the Sheme. The Authority had its investment guidelines revised in 2017 as per the Investment Guidelines Statutory Instrument (SI) number 19 of 2017.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
