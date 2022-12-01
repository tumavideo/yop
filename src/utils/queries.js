export const getCareers = () =>
  `*[_type == "opportunity" && opportunityType == "career-development"  && !(_id in path('drafts.**'))]`

export const getEducation = () =>
  `*[_type == "opportunity" && opportunityType == "skills"  && !(_id in path('drafts.**'))]`

export const findMarketplace = () =>
  `*[_type == "opportunity" && opportunityType == "market"  && !(_id in path('drafts.**'))]`

export const findJobs = () =>
  `*[_type == "opportunity" && opportunityType == "jobs" && !(_id in path('drafts.**'))]`

export const getFunding = () =>
  `*[_type == "opportunity" && opportunityType == "finance" && !(_id in path('drafts.**'))]`
