export const findOpportunities = (count = "5") => `{
  "job": *[_type == "job" && !(_id in path('drafts.**'))]{_id,_createdAt,position,description,location,qualifications,closingDate,enableApply,link,responsibilities,role,slug,title,companyRef->{company,bio,logo,website}} | order(_createdAt desc)[0..${count}],
  "finance": *[_type == "finance" && !(_id in path('drafts.**'))]{_id,_createdAt,title,description,companyRef->{company,logo}} | order(_createdAt desc)[0..${count}],
  "career": *[_type == "career" && !(_id in path('drafts.**'))]{_id,_createdAt,companyRef->{company,logo}} | order(_createdAt desc)[0..${count}],
  "skill": *[_type == "skill" && !(_id in path('drafts.**'))]{_id,_createdAt,title,description,companyRef->{company,logo}} | order(_createdAt desc)[0..${count}]
}`;
