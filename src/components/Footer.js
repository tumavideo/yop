import assets from '@/images/assets'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl py-24 px-4 sm:px-6 lg:py-32 lg:px-8">
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8 xl:col-span-1"></div>
            <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div className="mt-12 md:mt-0">
                  <a
                    href="https://www.crowdsourcecreators.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      className="h-10"
                      src={assets.CrowdsourceCreatorsDark}
                      alt="Company name"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <p className="text-base text-gray-400 xl:text-center">
            &copy; 2022 Crowdsource Creators, Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
