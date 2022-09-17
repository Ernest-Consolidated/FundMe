import { CheckIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Link } from "react-router-dom";
import routes from "../routes";

export default function VerificationSuccess() {
  return (
    <>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex flex-col items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <CheckIcon
                className="h-6 w-6 text-green-600"
                aria-hidden="true"
              />
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Verification successful
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Your identity has been verified
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <Link
              to={routes.dashboard}
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#013f28] text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            >
              Go back to dashboard
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
