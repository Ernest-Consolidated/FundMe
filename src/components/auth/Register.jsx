import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UseAuth from "../../hooks/UseAuth";
import routes from "../../routes";
import FormInput from "../Form/FormInput";

export default function Register() {
  const { createAccount } = UseAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const { email, password } = values;

  const handleSubmit = (email, pwd) => {
    createAccount(email, pwd);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "input a valid email",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];
  return (
    <>
      <div className="min-h-full bg-[url('https://tailwindui.com/img/beams-home@95.jpg')] bg-cover h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-20 w-auto"
              src="images/main.png"
              alt="FundMe"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Start A FundMe
            </h2>
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(email, password);
            }}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="space-y-3">
              {inputs.map((input) => (
                <FormInput
                  key={input.id}
                  {...input}
                  onChange={handleChange}
                  value={values[input.name]}
                />
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#013f28]"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-[#0f865a]"
                    aria-hidden="true"
                  />
                </span>
                Create Account
              </button>
            </div>
            <span className="items-center justify-center flex text-sm">
              Already have an account{" "}
              <Link to={routes.login} className="ml-1 underline text-gray-700">
                Login
              </Link>
              .
            </span>
          </form>
        </div>
      </div>
    </>
  );
}
