import { wait } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import { addDoc, collection } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { countries } from "../../data";
import {
  reset,
  setOnboarding,
  setWalletDetail,
} from "../../features/auth/authSlice";
import { db } from "../../firebase";

export default function Onboarding() {
  const { user, uid, isError, message, onBoarding } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    email: user,
  });
  const [country, setCountry] = useState("");
  const [accountType, setAccountType] = useState("");
  const [processing, setProcessing] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { firstName, lastName, email, phoneNumber, address } = formData;

  const incompleteForm =
    !firstName ||
    !lastName ||
    !email ||
    !country ||
    !address ||
    !phoneNumber ||
    !accountType;

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    if (onBoarding) {
      navigate("/dashboard");
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, onBoarding, dispatch]);

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleAccountChange = (e) => {
    setAccountType(e.target.value);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setProcessing(true);

    const WALLET_API_URI = "https://help-fd14d.uc.r.appspot.com/api/wallet";
    const ACCOUNT_API_URI =
      "https://help-fd14d.uc.r.appspot.com/api/virtual_account";
    const CARD_API_URI = "https://help-fd14d.uc.r.appspot.com/api/card";

    const body = {
      first_name: firstName,
      last_name: lastName,
      type: accountType,
      contact: {
        email: email,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        contact_type: accountType === "person" ? "personal" : "business",
        address: {
          name: `${firstName} ${lastName}`,
          line_1: address,
          country: country,
          phone_number: phoneNumber,
        },
        metadata: {
          merchant_defined: true,
        },
        country: country,
        nationality: country,
      },
    };

    try {
      const walletRes = await axios.post(WALLET_API_URI, body);
      console.log(walletRes.data);
      await addDoc(collection(db, "users", uid, "wallet"), {
        ...walletRes.data,
        onboarding: false,
      });
      const { data } = walletRes;
      dispatch(setWalletDetail(data));
      dispatch(setOnboarding());
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-center bg-no-repeat py-12 bg-[url('https://images.unsplash.com/photo-1613243555988-441166d4d6fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')] bg-cover min-h-screen lg:mt-0 lg:col-span-6">
        <div className="bg-white shadow-lg sm:max-w-md sm:w-full mx-6 rounded-sm sm:mx-auto sm:rounded-lg sm:overflow-hidden">
          <div className="px-4 py-8 sm:px-10">
            <div>
              <p className="text-sm font-medium text-gray-700">Onboarding</p>
            </div>

            <div className="mt-6">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="flex flex-row space-x-3">
                  <div className="">
                    <label htmlFor="firstName" className="sr-only">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      onChange={handleChange}
                      placeholder="First Name"
                      required
                      className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="">
                    <label htmlFor="lastName" className="sr-only">
                      Last Name
                    </label>
                    <div className="">
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        onChange={handleChange}
                        placeholder="Last Name"
                        className="inline-flex w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    required
                    readOnly
                    className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="sr-only">
                    Home Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Address line 1"
                    onChange={handleChange}
                    className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="">
                  <label htmlFor="phoneNumber" className="sr-only">
                    Phone number
                  </label>
                  <div>
                    <input
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className="inline-flex w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-3 md:flex-row lg:flex-row lg:space-x-3">
                  <div>
                    <label htmlFor="country" className="sr-only">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      onChange={handleCountryChange}
                      className="block w-full md:w-48 lg:w-48 max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                      value={country}
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
                    <label htmlFor="account-type" className="sr-only">
                      Account Type
                    </label>
                    <select
                      id="account-type"
                      name="account"
                      value={accountType}
                      onChange={handleAccountChange}
                      className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                    >
                      <option value="" disabled>
                        Account Type
                      </option>
                      <option value="person">person</option>
                      <option value="company">company</option>
                    </select>
                  </div>
                </div>
                <div>
                  <button
                    disabled={incompleteForm}
                    type="submit"
                    // onClick={handleDonate}
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
                    {processing ? "Saving..." : "Save"}
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
