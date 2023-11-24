"use client";
import { User } from "@supabase/auth-helpers-nextjs";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "next-share";
import { useState } from "react";

import { showToast } from "@/utils/toast";
export default function ReferralSection({
  user,
  data,
}: {
  user: User;
  data: any;
}) {
  const [clicked, setClicked] = useState(false);
  const props = {
    url: `https://www.inlightzambia.com/register?ref=${data?.referral_code}`,
    quote:
      "Check out the Black Friday deal at Inlight Zambia! Join me and get K100 in discounts.",
    hashtags: [
      "InLightZambia",
      "ILZ",
      "ArtificialIntelligence",
      "AI",
      "ZambiasFirstAICompany",
      "InnovationsAtItsFinest",
      "BlackFriday",
      "Top5Top5",
    ],
    title: "K100 in discounts at Inlight Zambia. Register and stand a chance!",
  };
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setClicked(true);
    showToast("Copied to clipboard", "");
  };

  return data ? (
    <div className="px-8 mb-4">
      <h6 className="block text-xl font-semibold leading-6 text-gray-900">
        🎉 Share the love, earn referral points 💃
      </h6>
      <div className="icons mt-4 flex justify-start items-center space-x-2">
        <FacebookShareButton {...props}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <LinkedinShareButton {...props}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <TwitterShareButton {...props}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <WhatsappShareButton {...props} separator=": ">
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>
      <h6 className="block mt-4 text-lg font-semibold leading-6 text-gray-900">
        Or copy the link 🤓...
      </h6>
      <div className="flex space-x-3">
        <p
          onClick={() => handleCopy(props.url)}
          className={`mt-2 block border-0 focus:ring-2 focus:ring-blue-600 focus:ring-inset p-2.5 pl-5 ring-1 ring-inset rounded-lg shadow-sm sm:leading-6 sm:text-sm cursor-pointer`}
        >
          {props.url}
        </p>
        <button
          onClick={() => handleCopy(props.url)}
          type="button"
          className={`hidden lg:flex justify-center items-center text-sm font-semibold leading-6 ${
            !clicked ? "text-gray-900" : "text-green-600"
          }`}
        >
          {!clicked ? "Copy" : "Copied!"}
        </button>
      </div>
    </div>
  ) : null;
}
