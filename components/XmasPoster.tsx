import assets from "@/assets";

function XmasPoster() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
          <div className={`px-6 lg:px-0 lg:pr-4 lg:pt-4 order-last`}>
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                12 Days of Christmas Giveaways!
              </h1>
              <div className="mt-6 text-lg leading-8 text-gray-600">
                <p>
                  Starting on 12th December, InLight Zambia will be offering 12
                  days of giveaways! That’s 12 days of unlimited access to
                  opportunities, 12 days of insightful information shared by our
                  team, and a chance to win an InLight Zambia branded tie dye
                  shirt, followed by a K250 and K500 voucher to Shoprite. The
                  more you refer, the better chance you have at winning!
                </p>
                <p className="mt-4">
                  <strong>Entry Requirements:</strong>
                </p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Sign Up on InLight Zambia and confirm your email.</li>
                  <li>
                    Navigate to your profile and upload a resume to access your
                    referral code.
                  </li>
                  <li>Refer friends!</li>
                </ul>
                <p className="mt-4">
                  <strong>Closing Date:</strong> 24th December, 2023.
                </p>
              </div>
            </div>
          </div>
          <div className="sm:px-6 lg:px-0">
            <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
              <a href="#/">
                <img
                  className="h-2/3 object-cover md:h-full ring-1 ring-white/10 rounded-tl-xl"
                  src={assets.christmas.src}
                  alt="Christmas Banner"
                />
              </a>
            </div>
            <div
              className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 sm:rounded-3xl"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default XmasPoster;
