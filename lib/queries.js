export const getServicesByCategory = (category) =>
  !category
    ? `
    *[_type == "service"] {
      _id,
      title,
      companyRef->{company,logo},
      department,
      link,
      description,
    } | order(_createdAt desc)[0..${5}]
  `
    : `
  *[_type == "service" && department == "${category}"] {
    _id,
    title,
    companyRef->{company,logo},
    department,
    link,
    description,
  } | order(_createdAt desc)[0..20]
`;

export const getTopCompanies = () => `
  *[_type == "company"] {
    company,
    logo,
    website,
    "count": count(*[_type == "job" && references(^._id)])
  } | order(count desc) [0...10]
`;

export const findOpportunities = (count = 5) => `{
  "job": *[_type == "job" && dateTime(_updatedAt) > dateTime(now()) - 60*60*24*7 && !(_id in path('drafts.**'))]{_id,_createdAt,position,description,field,location,qualifications,closingDate,enableApply,link,responsibilities,role,slug,title,companyRef->{company,bio,logo,website}} | order(_createdAt desc)[0..${count}],
  "finance": *[_type == "finance" && !(_id in path('drafts.**'))]{_id,_createdAt,position,description,location,qualifications,closingDate,enableApply,link,responsibilities,role,slug,title,companyRef->{company,bio,logo,website}} | order(_createdAt desc)[0..${count}],
  "skill": *[_type == "skill" && !(_id in path('drafts.**'))]{_id,_createdAt,position,description,location,qualifications,closingDate,enableApply,link,responsibilities,role,slug,title,companyRef->{company,bio,logo,website}} | order(_createdAt desc)[0..${count}],
  "banner": *[_type == "banner"][0..${count}]
}`;