/* This example requires Tailwind CSS v2.0+ */
import { MegaphoneIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Banner() {
  const [closed, setClosed] = useState(false);
  return (
    <>
      {!closed ? (
        <div className="fixed inset-x-0 bottom-0 pb-2 sm:pb-2">
          <div className="mx-auto max-w-xl px-2 sm:px-6 lg:px-3">
            <div className="rounded-lg bg-indigo-600 p-2 shadow-lg sm:p-3">
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex w-0 flex-1 items-center">
                  <span className="flex rounded-lg bg-indigo-800 p-2">
                    <MegaphoneIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </span>
                  <p className="ml-3 truncate font-medium text-white">
                    <span className="md:hidden">
                      We announced a new product!
                    </span>
                    <span className="hidden md:inline">
                      To create mutiple virtual cards
                    </span>
                  </p>
                </div>
                <div className="order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
                  <a
                    href="#"
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm hover:bg-indigo-50"
                  >
                    Contact Us
                  </a>
                </div>
                <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setClosed(true);
                    }}
                    className="-mr-1 flex rounded-md p-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="sr-only">Dismiss</span>
                    <XMarkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <p className="underline font-normal cursor-pointer text-sm">
            Contact Us
          </p>
        </div>
      )}
    </>
  );
}
