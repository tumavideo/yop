import Header from '@/components/Header'
import NoResults from '@/components/NoResults'
import Story from '@/components/Story'
import { client } from '@/lib/client'
import { getPosts } from '@/utils/queries'
import React from 'react'

export default function SuccessStories({ videos }) {
  return (
    <div className="h-screen bg-gray-100">
      <div className="mx-auto flex max-w-4xl flex-col md:px-8 xl:px-0">
        <main className="flex-1">
          <Header title={'Success Stories'} />
          <div className="mx-h-screen relative mx-auto max-w-4xl md:px-8 xl:px-0">
            <div className="overflow-hidden bg-white sm:rounded-lg sm:shadow">
              <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {
                    'Hear from others, about their experience with our platform.'
                  }
                </h3>

                {/* list out testimonials */}
                {videos && videos.length ? (
                  videos.map((video) => <Story key={video._id} post={video} />)
                ) : (
                  <NoResults />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = getPosts()
  const videos = await client.fetch(query)

  return {
    props: { videos },
  }
}
