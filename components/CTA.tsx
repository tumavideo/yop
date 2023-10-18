import assets from "@/assets";

export default function CTA({
                              company = false,
                              title = "Get started today",
                              description = "It’s time to take control of your career. Start finding the right opportunities to build a brighter future."
                            }) {
  return company ? <div className="relative flex flex-col bg-orange-500 rounded-0 md:rounded-md" style={{background: "#DF912F"}}>
        <div className="md:w-7/12 w-12/12 py-10 px-10 md:py-12 md:px-12">
          <h2 className="font-bold tracking-tight text-white text-center md:text-left text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg tracking-tight text-center md:text-left text-white">
            {description}
          </p>
          <div className="text-center md:text-left">
            <a
                className="group inline-flex align-self-center items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-white text-slate-900 hover:bg-red-50 active:bg-red-200 active:text-slate-600 focus-visible:outline-white mt-10"
                href={`/register?type=${company ? "company" : "seeker"}`}
            >
              Try 1 month free
            </a>
          </div>
        </div>
        <div className="md:w-6/12 w-12/12">
          <img className="md:w-5/12 w-full md:absolute md:right-0 md:bottom-0" src={assets.man_job.src} alt="logo" />
        </div>
      </div>

      :

      <div className="relative flex flex-col bg-orange-500 rounded-0 md:rounded-md" style={{background: "#CB2229"}}>
        <div className="md:w-7/12 w-12/12 py-10 px-10 md:py-12 md:px-12">
          <h2 className="font-bold tracking-tight text-white text-center md:text-left text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg tracking-tight text-center md:text-left text-white">
            {description}
          </p>
          <div className="text-center md:text-left">
            <a
                className="group inline-flex align-self-center items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-white text-slate-900 hover:bg-red-50 active:bg-red-200 active:text-slate-600 focus-visible:outline-white mt-10"
                href={`/services`}
            >
              Click to services
            </a>
          </div>
        </div>
        <div className="md:w-5/12 w-12/12">
          <img className="md:w-3/12 md:absolute md:right-0 md:bottom-0 mx-auto md:mr-40" src={assets.wow_job.src} alt="logo" />
        </div>
      </div>
}
