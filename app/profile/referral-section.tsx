"use client";
import { Dialog, Transition } from "@headlessui/react";
import { DocumentArrowUpIcon } from "@heroicons/react/24/outline";
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
import { Fragment, useState } from "react";

import { showToast } from "@/utils/toast";
import { useRouter } from "next/navigation";

export function UploadResumeModal({ onClose, open }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white p-4 text-left shadow-xl transition-all sm:max-w-sm sm:p-6">
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <DocumentArrowUpIcon
                    className="h-6 w-6 text-red-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    Woops!
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      You need to upload your resume before getting your
                      referral code!
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  onClick={onClose}
                >
                  {!location.href.endsWith("profile") ? "Take me there!" : "Ok"}
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default function ReferralSection({
  user,
  data,
}: {
  user: User;
  data: any;
}) {
  const [clicked, setClicked] = useState(false);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const props = {
    url: `https://www.inlightzambia.com/register?ref=${data?.referral_code}`,
    quote:
      "Check out the 12 days of Christmas giveaways at Inlight Zambia! Join me and get K100 in discounts.",
    hashtags: [
      "InLightZambia",
      "ILZ",
      "ArtificialIntelligence",
      "AI",
      "ZambiasFirstAICompany",
      "InnovationsAtItsFinest",
      "12DaysOfChristmas",
      "Top5Top5",
    ],
    title: "12 days of Christmas at Inlight Zambia",
  };
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setClicked(true);
    showToast("Copied to clipboard", "");
  };

  function onClose() {
    setShowModal(false);
    if (!location.href.endsWith("profile")) router.replace("/profile");
  }

  if (!user?.user_metadata?.resume)
    return (
      <>
        <UploadResumeModal open={showModal} onClose={onClose} />
        <div className="px-8 mb-4">
          <h6 className="block text-xl font-semibold leading-6 text-gray-900">
            Unlock your referral code
          </h6>
          <button
            onClick={() => setShowModal(true)}
            type="button"
            className="mt-4 inline-flex justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Unlock now!
          </button>
        </div>
      </>
    );

  return data ? (
    <div className="px-8 mb-4">
      <h6 className="text-base block md:text-xl font-semibold leading-6 text-gray-900">
        Share, it’s all just a click away 💡
      </h6>
      <div
        className={`icons mt-4 flex justify-${
          location.href.endsWith("profile") ? "start" : "center"
        } items-center space-x-2`}
      >
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
      <div className="mt-4 flex space-x-3">
        <p
          onClick={() => handleCopy(props.url)}
          className={`mt-2 block border-0 focus:ring-2 focus:ring-blue-600 focus:ring-inset p-2.5 pl-5 ring-1 ring-inset rounded-lg shadow-sm sm:leading-6 sm:text-sm cursor-pointer`}
        >
          {props.url}
        </p>
        {location.href.endsWith("profile") && (
          <button
            onClick={() => handleCopy(props.url)}
            type="button"
            className={`hidden lg:flex justify-center items-center text-sm font-semibold leading-6 ${
              !clicked ? "text-gray-900" : "text-green-600"
            }`}
          >
            {!clicked ? "Copy" : "Copied!"}
          </button>
        )}
      </div>
    </div>
  ) : null;
}
