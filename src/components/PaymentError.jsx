import React from "react";
import { Link } from "react-router-dom";
import routes from "../routes";

export default function PaymentError() {
  return (
    <>
      <div className="bg-white min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="max-w-max mx-auto">
          <main className="sm:flex">
            <p className="text-4xl font-extrabold text-[#013f28] sm:text-5xl">
              403
            </p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                  Payment error
                </h1>
                <p className="mt-1 text-base text-gray-500">
                  Your payment was unsuccessful, please try again.
                </p>
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <Link
                  to={routes.home}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#013f28] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Go back home
                </Link>
                <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-[#013f28] bg-indigo-100  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Contact support
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
