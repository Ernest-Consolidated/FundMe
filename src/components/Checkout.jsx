import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { countries } from "../data";
import axios from "axios";

export default function Checkout() {
  const [processing, setProcessing] = useState("");
  const [formData, setFormData] = useState({
    amount: "",
    ewallet: "",
  });
  const [country, setCountry] = useState("");
  const [currency, setCurrency] = useState("");

  const { ewallet, amount } = formData;

  const incompleteForm = !ewallet || !currency || !country || !amount;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };
  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleDonate = async (e) => {
    e.preventDefault();

    setProcessing(true);

    const API_URI = "https://help-fd14d.uc.r.appspot.com/api/create_checkout";
    const body = {
      ewallet,
      country,
      amount,
      currency,
    };

    try {
      const res = await axios.post(API_URI, body);
      window.location.href = res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#013f28]">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:py-11 sm:px-6 lg:flex lg:flex-col lg:px-8">
        <div className="items-center justify-center mb-5 z-50">
          <h2 className="text-4xl text-center font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Donate in other currencies
          </h2>
          <p className="mt-5 text-xl text-gray-300 text-center">
            You can also donate in other currencies here⬇ supported currencies
            are GBP, USD, EUR & SGD
          </p>
        </div>
        <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
          <div className="bg-white sm:max-w-md sm:w-full sm:mx-auto rounded-lg sm:rounded-lg sm:overflow-hidden">
            <div className="px-4 py-8 sm:px-10">
              <form className="space-y-6">
                <div>
                  <label htmlFor="wallet" className="sr-only">
                    User Wallet ID
                  </label>
                  <input
                    // disabled={walletParam && true}
                    type="text"
                    name="ewallet"
                    id="ewallet"
                    value={ewallet}
                    // autoComplete="name"
                    onChange={handleChange}
                    placeholder="User Wallet ID"
                    required
                    className={
                      "block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                    }
                  />
                </div>

                <div>
                  <label htmlFor="mobile-or-email" className="sr-only">
                    Amount
                  </label>
                  <input
                    type="text"
                    name="amount"
                    id="amount"
                    placeholder="Amount"
                    value={amount}
                    onChange={handleChange}
                    required
                    className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="mobile-or-email" className="sr-only">
                    Currency
                  </label>
                  <select
                    type="text"
                    name="currency"
                    value={currency}
                    defaultValue="Currency"
                    onChange={handleCurrencyChange}
                    required
                    className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="" disabled>
                      Currency
                    </option>
                    <option>GBP</option>
                    <option>USD</option>
                    <option>SGD</option>
                    <option>EUR</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="mobile-or-email" className="sr-only">
                    Country
                  </label>
                  <select
                    type="text"
                    name="country"
                    value={country}
                    defaultValue="Country"
                    onChange={handleCountryChange}
                    required
                    className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="" disabled>
                      Country
                    </option>
                    {countries.map((country, index) => (
                      <option key={index} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <button
                    disabled={incompleteForm}
                    type="submit"
                    onClick={handleDonate}
                    className={
                      incompleteForm
                        ? "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400"
                        : "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#013f28]"
                    }
                  >
                    {processing && (
                      <div role="status">
                        <svg
                          className="inline mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
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
                    {processing ? "Processing..." : "Proceed to Pay"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* <div className="mt-10 w-full max-w-xs">
          
        </div> */}
      </div>
    </div>
  );
}
