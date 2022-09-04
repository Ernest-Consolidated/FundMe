import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { countries } from "../../data";
import { reset, setOnboarding } from "../../features/auth/authSlice";

export default function Onboarding() {
  const { user, isError, message, onBoarding } = useSelector(
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

  const { firstName, lastName, email } = formData;

  const incompleteForm =
    !firstName || !lastName || !email || !country || !accountType;

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

  const handleSubmit = (e) => {
    e.preventDefault();

    setProcessing(true);

    dispatch(setOnboarding());

    navigate("/dashboard");
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
                    placeholder="Address (optional)"
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
                      placeholder="Phone Number (optional)"
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
                      <option value="Personal">Personal</option>
                      <option value="Company">Company</option>
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
                    {processing ? "Processing..." : "Save"}
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
