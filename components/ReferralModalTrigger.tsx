"use client";
import ReferralSection from "../app/profile/referral-section";

import { Dialog, Transition } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

export function ReferralModal({ onClose, open, session, data, user }) {
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
                {!session && (
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                    <UserCircleIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                )}
                <div className="mt-3 text-center sm:mt-5">
                  {!session && (
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Sign In
                    </Dialog.Title>
                  )}
                  <div className="mt-2">
                    {session ? (
                      <ReferralSection user={user} data={data} />
                    ) : (
                      <p className="text-sm text-gray-500">
                        You'll need to be logged in to access your referral
                        code!
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                {!session && (
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    onClick={onClose}
                  >
                    Sign In
                  </button>
                )}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default function ReferralModalTrigger({ children, ...props }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  function onClose() {
    setOpen(false);
    if (!props?.session) {
      router.replace("/login?promo=12");
    }
  }
  return (
    <>
      <ReferralModal
        session={props?.session}
        open={open}
        onClose={onClose}
        data={props?.data}
        user={props?.user}
      />
      <div onClick={() => setOpen(true)}>{children}</div>
    </>
  );
}
