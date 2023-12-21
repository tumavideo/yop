import { urlFor } from "@/lib/client";

const features = [];

export default function Feature({ flip = 0, program }) {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
          <div
            className={`px-6 lg:px-0 lg:pr-4 lg:pt-4 ${flip && "order-last"}`}
          >
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
              {program.logo ? (
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  <img
                    className="h-1/3 object-cover md:h-full ring-1 ring-white/10 rounded-tl-xl man-w-full"
                    src={urlFor(program.logo)}
                    alt={`pro-${program._id}`}
                  />
                </p>
              ) : (
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {program.name}
                </p>
              )}
              <p
                className="mt-6 text-lg leading-8 text-gray-600"
                dangerouslySetInnerHTML={{ __html: program.description }}
              ></p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature, index) => (
                  <div
                    key={`${feature.name}${index}`}
                    className="relative pl-9"
                  >
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon
                        className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="sm:px-6 lg:px-0">
            <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
              {program.banner && (
                <a href={`/govt/${program._id}`}>
                  <img
                    src={urlFor(program.banner)}
                    alt="Product screenshot"
                    width={500}
                    height={500}
                    className="h-1/3 object-cover md:h-full ring-1 ring-white/10 rounded-tl-xl man-w-full"
                  />
                </a>
              )}
            </div>
            <div
              className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 sm:rounded-3xl"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
