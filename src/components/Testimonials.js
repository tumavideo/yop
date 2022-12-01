import assets from '@/images/assets'
import Image from 'next/image'
import React from 'react'

export default function Testimonials() {
  return (
    <div className="Testimonials">
      (
      <div className="bg-gray-800">
        <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <h2 className="text-center text-base font-semibold text-gray-400">
            Trusted by over 4 forward-thinking ministries
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <Image
                width={300}
                height={100}
                className="h-12"
                src={assets.Labour}
                alt="Tuple"
              />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <Image
                width={300}
                height={100}
                className="h-12"
                src={assets.Smart}
                alt="Mirage"
              />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <Image
                width={300}
                height={100}
                className="h-12"
                src={assets.Tech}
                alt="StaticKit"
              />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-3 lg:col-span-1">
              <Image
                width={300}
                height={100}
                className="h-12"
                src={assets.Youth}
                alt="Transistor"
              />
            </div>
          </div>
        </div>
      </div>
      )
    </div>
  )
}
