export const findOpportunities = () => `{
  "job": *[_type == "job" && !(_id in path('drafts.**'))]{_id,position,companyRef->{company,logo}}[0..5],
  "finance": *[_type == "finance" && !(_id in path('drafts.**'))]{_id,companyRef->{company,logo}}[0..5],
  "career": *[_type == "career" && !(_id in path('drafts.**'))]{_id,companyRef->{company,logo}}[0..5],
  "skill": *[_type == "skill" && !(_id in path('drafts.**'))]{_id,companyRef->{company,logo}}[0..5]
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
