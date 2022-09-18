/* This example requires Tailwind CSS v2.0+ */
import { MegaphoneIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useState } from "react";

export default function Banner({ ewallet, contact }) {
  const [closed, setClosed] = useState(false);
  const [processing, setProcessing] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();

    setProcessing(true);

    const API_URI = "https://help-fd14d.uc.r.appspot.com/api/verify";
    const body = {
      ewallet,
      contact,
    };

    try {
      const res = await axios.post(API_URI, body);
      window.location.href = res.data.redirect_url;
    } catch (error) {
      console.log(error);
    }
  };

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
                    <span className="md:hidden">Check your identity</span>
                    <span className="hidden md:inline">
                      Let us verify your identity
                    </span>
                  </p>
                </div>
                <div className="order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
                  <button
                    onClick={handleClick}
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm hover:bg-indigo-50"
                  >
                    {processing && (
                      <div role="status">
                        <svg
                          className="inline mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-indigo-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      </div>
                    )}
                    {processing ? "" : "Verify Identity"}
                  </button>
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
