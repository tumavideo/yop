export const getProgramById = (id) => `
  *[_type == "program" && _id == "${id}"] {
    _id,
    program,
    description,
    link,
    logo,
    banner,
    video,
  }[0]
`;

export const getPrograms = () => `
  *[_type == "program"] {
    _id,
    program,
    description,
    link,
    logo,
    banner,
    video,
  } | order(count desc) [0...10]
`;

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

export const findOpportunities = (count = 100) => `{
  "job": *[_type == "job" && closingDate > now() && !(_id in path('drafts.**'))]{_id,_createdAt,position,description,experience,field,location,qualifications,closingDate,enableApply,link,responsibilities,role,slug,title,companyRef->{_id,company,bio,logo,website}} | order(_createdAt desc)[0..${count}],
  "finance": *[_type == "finance" && !(_id in path('drafts.**'))]{_id,_createdAt,position,description,location,qualifications,closingDate,enableApply,link,responsibilities,role,slug,title,companyRef->{company,bio,logo,website}} | order(_createdAt desc)[0..${count}],
  "skill": *[_type == "skill" && !(_id in path('drafts.**'))]{_id,_createdAt,position,description,location,qualifications,closingDate,enableApply,link,responsibilities,role,slug,title,companyRef->{company,bio,logo,website}} | order(_createdAt desc)[0..${count}],
  "banner": *[_type == "banner"][0..${count}],
  "fields": *[_type == "job" && closingDate > now() && !(_id in path('drafts.**')) && defined(field)]{field}
}`;
