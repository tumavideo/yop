export const findJobById = (id) => `{
  "job": *[_type == "job" && _id == "${id}" && !(_id in path('drafts.**'))]{_id,_createdAt,position,description,location,qualifications,closingDate,enableApply,link,responsibilities,role,slug,title,companyRef->{company,bio,logo,website}}[0]
}`

export const findOpportunities = (count = "5") => `{
  "job": *[_type == "job" && dateTime(_updatedAt) > dateTime(now()) - 60*60*24*7 && !(_id in path('drafts.**'))]{_id,_createdAt,position,description,location,qualifications,closingDate,enableApply,link,responsibilities,role,slug,title,companyRef->{company,bio,logo,website}} | order(_createdAt desc)[0..${count}],
  "finance": *[_type == "finance" && dateTime(_updatedAt) > dateTime(now()) - 60*60*24*7 && !(_id in path('drafts.**'))]{_id,_createdAt,position,description,location,qualifications,closingDate,enableApply,link,responsibilities,role,slug,title,companyRef->{company,bio,logo,website}} | order(_createdAt desc)[0..${count}],
  "skill": *[_type == "skill" && dateTime(_updatedAt) > dateTime(now()) - 60*60*24*7 && !(_id in path('drafts.**'))]{_id,_createdAt,position,description,location,qualifications,closingDate,enableApply,link,responsibilities,role,slug,title,companyRef->{company,bio,logo,website}} | order(_createdAt desc)[0..${count}],
  "banner": *[_type == "banner"][0..${count}]
}`;
