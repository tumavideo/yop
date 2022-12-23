import Listing from '@/components/Listing'
import { client } from '@/lib/client'

export default function Career({ career }) {
  return (
    <>
      <Listing opportunity={career} />
    </>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "career"] {
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
  const query = `*[_type == "career" && _id == '${id}'][0]{
    _id,
    _createdAt,
    _type,
    brief,
    description,
    title,
    link,
    companyRef->{bio,company,feature,logo}
  }`
  const career = await client.fetch(query)

  return {
    props: { career },
  }
}
