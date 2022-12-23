import Listing from '@/components/Listing'
import { client } from '@/lib/client'

export default function Finance({ finance }) {
  return (
    <>
      <Listing opportunity={finance} />
    </>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "finance"] {
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
  const query = `*[_type == "finance" && _id == '${id}'][0]{
    _id,
    _createdAt,
    _type,
    brief,
    description,
    link,
    title,
    companyRef->{bio,company,feature,logo}
  }`
  const finance = await client.fetch(query)

  return {
    props: { finance },
  }
}
