export const getCareers = () =>
  `*[_type == "career" && !(_id in path('drafts.**'))]{
    _id,
    _createdAt,
    title,
    companyRef->{company,logo}
  }`

export const getEducation = () =>
  `*[_type == "skill" && !(_id in path('drafts.**'))]{
    _id,
    _createdAt,
    title,
    companyRef->{company,logo}
  }`

export const findMarketplace = () =>
  `*[_type == "market" && !(_id in path('drafts.**'))]{
    _id,
    _createdAt,
    title,
    companyRef->{company,logo}
  }`

export const findJobs = () => `*[_type == "job" && !(_id in path('drafts.**'))]{
  _id,
  _createdAt,
  title,
  companyRef->{company,logo}
}`

export const getFunding = () =>
  `*[_type == "finance" && !(_id in path('drafts.**'))]{
    _id,
    _createdAt,
    title,
    companyRef->{company,logo}
  }`
