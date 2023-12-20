import Collage from "./Collage";

export default function Hero({ showButtons = false }) {
  return (
    <>
      <div className="bg-white relative isolate">
        <div
          className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
          aria-hidden="true"
        >
          <div
            className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
            }}
          />
        </div>
        <div className="overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 pb-32 sm:pt-15 lg:px-8 lg:pt-2">
            <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
              <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                <h1 className="mt-20 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Changing the way organizations connect with people.
                </h1>
                <p className="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                  We are excited to introduce InLight Zambia, an informative
                  platform that gives government, private sector and civil
                  society a place to highlight jobs, skills and funding
                  opportunities, and for Zambians to access them.
                </p>
                {showButtons ? (
                  <div className="mt-10 flex items-center gap-x-6">
                    <a
                      href="/register?type=company"
                      className="px-5 py-3 text-sm font-medium text-center text-white bg-red-500 rounded-lg cursor-pointer hover:bg-red-600 focus:ring-4 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-600 dark:focus:ring-red-600"
                    >
                      Post an opportunity
                    </a>
                    <a
                      href="/register?type=seeker"
                      className="border-black hover:border-red-600 border-2 px-5 py-2 rounded-md bg-white text-sm font-semibold leading-6 text-black shadow-sm hover:text-red-600 text-center"
                    >
                      Find an opportunity
                    </a>
                  </div>
                ) : (
                  <div className="mt-10 flex items-center gap-x-6">
                    <a
                      href="/opportunity"
                      className="border-black hover:border-red-600 border-2 px-5 py-2 rounded-md bg-white text-sm font-semibold leading-6 text-black shadow-sm hover:text-red-600 text-center"
                    >
                      Find an opportunity
                    </a>
                  </div>
                )}
              </div>
              <Collage />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
