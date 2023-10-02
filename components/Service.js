import { departmentOptions } from "@/constants";
import { getDepartment } from "@/utils";

export default function Service({ service }) {
  const department = getDepartment(departmentOptions, service);

  return (
    <div className="relative flex flex-col jus items-center justify-center overflow-hidden bg-gray-50 p-6 sm:py-12">
      <div className="bg-white shadow-xl shadow-gray-100 w-full max-w-4xl flex flex-col sm:flex-row gap-3 sm:items-center justify-between px-5 py-4 rounded-md">
        {/* {service.companyRef?.logo && (
          <div className="col-md-4 d-flex justify-content-center align-items-center">
            <img
              style={{ maxWidth: "100%", maxHeight: 240 }}
              className="card-image p-3"
              src={urlFor(service.companyRef?.logo?.asset).url()}
              alt="govt-1"
            />
          </div>
        )} */}
        <div>
          <span className="text-red-600 text-sm">{department.title}</span>
          <h3 className="font-bold mt-px">{service.title}</h3>
          <span className="line-clamp-4 sm:line-clamp-2 text-gray-900">
            {service.description}
          </span>
        </div>
        <div>
          <a
            href={`${service.link}`}
            className="bg-red-600 text-white font-medium px-4 py-2 rounded-md flex gap-1 items-center"
            target="_blank"
          >
            Apply{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
