export const getPosts = () =>
  `*[_type == "post" && !(_id in path('drafts.**'))]{
    _id,
    caption,
     video{
      asset->{
        _id,
        url
      }
    },
    userId,
    postedBy->{
      _id,
      userName,
      image
    },
}`

export const getCareers = () =>
  `*[_type == "career" && !(_id in path('drafts.**'))]{
    _id,
    _createdAt,
    title,
    link,
    companyRef->{company,logo}
  }`

export const getEducation = () =>
  `*[_type == "skill" && !(_id in path('drafts.**'))]{
    _id,
    _createdAt,
    title,
    link,
    companyRef->{company,logo}
  }`

export const findMarketplace = () =>
  `*[_type == "market" && !(_id in path('drafts.**'))]{
    _id,
    _createdAt,
    slug,
    title,
    link,
    companyRef->{company,logo}
  }`

export const findJobs = () => `*[_type == "job" && !(_id in path('drafts.**'))]{
  _id,
  _createdAt,
  position,
  role,
  slug,
  title,
  link,
  companyRef->{company,logo}
}`

export const findCompanies = () =>
  `*[_type == "company" && !(_id in path('drafts.**'))]{
    _id,
    logo,
    company,
    bio,
  }`

export const getFunding = () =>
  `*[_type == "finance" && !(_id in path('drafts.**'))]{
    _id,
    _createdAt,
    title,
    link,
    companyRef->{company,logo}
  }`
