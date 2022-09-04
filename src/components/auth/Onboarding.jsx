import React from "react";

export default function Onboarding() {
  return (
    <>
      <div className="bg-center bg-no-repeat py-12 bg-[url('https://images.unsplash.com/photo-1613243555988-441166d4d6fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')] bg-cover min-h-screen lg:mt-0 lg:col-span-6">
        <div className="bg-white shadow-lg sm:max-w-md sm:w-full mx-6 rounded-sm sm:mx-auto sm:rounded-lg sm:overflow-hidden">
          <div className="px-4 py-8 sm:px-10">
            <div>
              <p className="text-sm font-medium text-gray-700">Onboarding</p>
            </div>

            <div className="mt-6">
              <form className="space-y-6">
                <div className="flex flex-row space-x-3">
                  <div className="">
                    <label htmlFor="mobile-or-email" className="sr-only">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="mobile-or-email"
                      id="mobile-or-email"
                      autoComplete="cc-exp"
                      //   onChange={(e) => setExpMonth(e.target.value)}
                      placeholder="First Name"
                      required
                      className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="">
                    <label htmlFor="mobile-or-email" className="sr-only">
                      Last Name
                    </label>
                    <div className="">
                      <input
                        type="text"
                        name="exp-year"
                        id="exp-year"
                        autoComplete="cc-exp"
                        // onChange={(e) => setExpYear(e.target.value)}
                        placeholder="Last Name"
                        className="inline-flex w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="mobile-or-email" className="sr-only">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    // onChange={(e) => setCardName(e.target.value)}
                    placeholder="emmycontacts@gmail.com"
                    required
                    className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="home-address" className="sr-only">
                    Home Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Address line 1"
                    // onChange={(e) => setCardNumber(e.target.value)}
                    required
                    className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="flex flex-row space-x-3">
                  <div className="">
                    <label htmlFor="mobile-or-email" className="sr-only">
                      D.O.B
                    </label>
                    <input
                      type="date"
                      name="dob"
                      id="dob"
                      //   onChange={(e) => setExpMonth(e.target.value)}
                      required
                      className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="">
                    <label htmlFor="phone-number" className="sr-only">
                      Phone number
                    </label>
                    <div className="">
                      <input
                        type="text"
                        name="phone-number"
                        id="phone-number"
                        // onChange={(e) => setExpYear(e.target.value)}
                        placeholder="Phone Number"
                        className="inline-flex w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-row space-x-3">
                  <div>
                    <label htmlFor="country" className="sr-only">
                      Country
                    </label>
                    <input
                      id="country"
                      name="country"
                      type="text"
                      placeholder="Country"
                      //   onChange={(e) => setCvv(e.target.value)}
                      required
                      className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label htmlFor="account-type" className="sr-only">
                      Account Type
                    </label>
                    <input
                      id="account-type"
                      name="account-type"
                      type="text"
                      placeholder="Account Type"
                      //   onChange={(e) => setAmount(e.target.value)}
                      required
                      className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <button
                    // disabled={incompleteForm}
                    type="submit"
                    // onClick={handleDonate}
                    className={
                      //   "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400"
                      "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#013f28]"
                    }
                  >
                    {"Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
