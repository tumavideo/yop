import Listing from '@/components/Listing'
import { client } from '@/lib/client'

export default function Job({ job }) {
  return (
    <>
      <Listing opportunity={job} />
    </>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "job"] {
    _id
  }
  `
  const opportunities = await client.fetch(query)
  const paths = opportunities.map((opportunity) => ({
    params: {
      id: opportunity._id,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = async ({ params: { id } }) => {
  const query = `*[_type == "job" && _id == '${id}'][0]{
    _id,
    _createdAt,
    _type,
    brief,
    description,
    feature,
    link,
    role,
    position,
    responsibilities,
    title,
    companyRef->{bio,company,feature,logo}
  }`
  const job = await client.fetch(query)

  return {
    props: { job },
  }
}
