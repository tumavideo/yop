export const findOpportunities = (count = "5") => `{
  "job": *[_type == "job" && !(_id in path('drafts.**'))]{_id,position,companyRef->{company,logo}}[0..${count}],
  "finance": *[_type == "finance" && !(_id in path('drafts.**'))]{_id,companyRef->{company,logo}}[0..${count}],
  "career": *[_type == "career" && !(_id in path('drafts.**'))]{_id,companyRef->{company,logo}}[0..${count}],
  "skill": *[_type == "skill" && !(_id in path('drafts.**'))]{_id,companyRef->{company,logo}}[0..${count}]
}`;

export const findJobs = () => `*[_type == "job" && !(_id in path('drafts.**'))]{
  _id,
  _createdAt,
  position,
  role,
  slug,
  title,
  link,
  companyRef->{company,logo}
}`;
