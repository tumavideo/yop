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
