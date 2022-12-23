export default function Meta({ company = {}, job = {} }) {
  return (
    <div className="Meta">
      {/* Description list */}
      <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          {company.bio && (
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">
                Company Info
              </dt>
              <dd
                className="mt-1 max-w-prose space-y-5 text-sm text-gray-900"
                dangerouslySetInnerHTML={{ __html: company.bio }}
              />
            </div>
          )}
          {company.location && (
            <div key={'companySize'} className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                {'Location'}
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{company.location}</dd>
            </div>
          )}
          {company.companySize && (
            <div key={'companySize'} className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                {'Company Size'}
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {company.companySize}
              </dd>
            </div>
          )}
          {job.brief && (
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">
                About the Role
              </dt>
              <dd
                className="mt-1 max-w-prose space-y-5 text-sm text-gray-900"
                dangerouslySetInnerHTML={{
                  __html: job.brief || 'N/A',
                }}
              />
            </div>
          )}
          {job.responsibilities && (
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">
                Responsibilities
              </dt>
              <dd
                className="mt-1 max-w-prose space-y-5 text-sm text-gray-900"
                dangerouslySetInnerHTML={{
                  __html: job.responsibilities || 'N/A',
                }}
              />
            </div>
          )}
          {job.whyJoin && (
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">
                Why you should join {job.companyRef.company}
              </dt>
              <dd
                className="mt-1 max-w-prose space-y-5 text-sm text-gray-900"
                dangerouslySetInnerHTML={{
                  __html: job.brief || 'N/A',
                }}
              />
            </div>
          )}
          {job.position && (
            <div key={'position'} className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Title</dt>
              <dd className="mt-1 text-sm text-gray-900">{job.position}</dd>
            </div>
          )}
          {job.link && (
            <div key={'website'} className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Website</dt>
              <dd className="mt-1 text-sm text-blue-500">
                <a href={job.link} target="_blank" rel="noopener noreferrer">
                  {job.link}
                </a>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  )
}
