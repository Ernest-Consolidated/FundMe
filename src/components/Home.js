import React, { Fragment, useState } from "react";
import { Popover, Transition, Combobox } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import FAQ from "./FAQ";
import Support from "./Support";
import axios from "axios";
import routes from "../routes";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { resetWallet } from "../features/wallet/walletSlice";

const navigation = [
  { name: "Home", href: "#", id: "#" },
  { name: "FAQ", href: "#", id: "#faq" },
  { name: "Support", href: "#", id: "#support" },
  { name: "Partners", href: "#", id: "partners" },
];

const people = [
  { id: 1, name: "Leslie Alexander" },
  { id: 2, name: "Leslie Alexander" },
  { id: 3, name: "Leslie Alexander" },
  { id: 4, name: "Leslie Alexander" },
  { id: 5, name: "Leslie Alexander" },
  { id: 6, name: "Leslie Alexander" },
  { id: 7, name: "Leslie Alexander" },
  { id: 8, name: "Leslie Alexander" },
  { id: 9, name: "Leslie Alexander" },
  { id: 10, name: "Leslie Alexander" },
  // More users...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState();
  const [cardNumber, setCardNumber] = useState(null);
  const [cardName, setCardName] = useState(null);
  const [walletId, setWalletID] = useState(null);
  const [amount, setAmount] = useState(null);
  const [cvv, setCvv] = useState(null);
  const [expMonth, setExpMonth] = useState(null);
  const [expYear, setExpYear] = useState(null);
  const [processing, setProcessing] = useState("");
  const [walletParam, setWalletParam] = useState(false);
  const { walletIdFromParams } = useSelector((state) => state.wallet);
  const dispatch = useDispatch();

  const incompleteForm =
    !cardName ||
    !cardNumber ||
    !amount ||
    !cvv ||
    !expMonth ||
    !expYear ||
    !walletId;

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  useEffect(() => {
    if (walletIdFromParams) {
      setWalletID(walletIdFromParams);
      setWalletParam(true);
    }

    return () => {
      dispatch(resetWallet());
    };
  }, [walletIdFromParams]);
  // console.log(incompleteForm);
  // https://api.ebay.com/commerce/charity/v1/charity_org

  const handleDonate = async (e) => {
    e.preventDefault();

    setProcessing(true);

    const API_URI = "https://help-fd14d.uc.r.appspot.com/api/donate";
    const body = {
      name: cardName,
      userWalletId: walletId,
      amount: amount,
      payment_method: {
        type: "sg_debit_cup_card",
        fields: {
          number: cardNumber,
          name: cardName,
          expiration_month: expMonth,
          expiration_year: expYear,
          cvv: cvv,
        },
      },
    };

    try {
      const res = await axios.post(API_URI, body);
      window.location.href = res.data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="relative bg-[#013f28] overflow-hidden min-h-screen">
        <div
          className="hidden sm:block sm:absolute sm:inset-0"
          aria-hidden="true"
        >
          <svg
            className="absolute bottom-0 right-0 transform translate-x-1/2 mb-48 text-gray-700 lg:top-0 lg:mt-28 lg:mb-0 xl:transform-none xl:translate-x-0"
            width={364}
            height={384}
            viewBox="0 0 364 384"
            fill="none"
          >
            <defs>
              <pattern
                id="eab71dd9-9d7a-47bd-8044-256344ee00d0"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect x={0} y={0} width={4} height={4} fill="currentColor" />
              </pattern>
            </defs>
            <rect
              width={364}
              height={384}
              fill="url(#eab71dd9-9d7a-47bd-8044-256344ee00d0)"
            />
          </svg>
        </div>
        <div className="relative pt-6 pb-16 sm:pb-24">
          <Popover>
            <nav
              className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6"
              aria-label="Global"
            >
              <div className="flex items-center flex-1">
                <div className="flex items-center justify-between w-full md:w-auto">
                  <a href="#">
                    <span className="sr-only">Workflow</span>
                    <img
                      className="h-16 w-auto sm:h-10"
                      src="images/main.png"
                      alt=""
                    />
                    {/* <span className="h-8 w-auto sm:h-10">🤝</span> */}
                  </a>
                  <div className="-mr-2 flex items-center md:hidden">
                    <Popover.Button className="rounded-md p-2 inline-flex items-center justify-center text-white focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="hidden space-x-10 md:flex md:ml-10">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="font-medium text-white hover:text-gray-300"
                      id={item.id}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="hidden md:flex">
                <Link
                  to={routes.start}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#063020]"
                >
                  Start A FundMe
                </Link>
              </div>
            </nav>

            <Transition
              as={Fragment}
              enter="duration-150 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                focus
                className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
              >
                <div className="rounded-lg shadow-md bg-white overflow-hidden">
                  <div className="px-5 pt-4 flex items-center justify-between">
                    <div>
                      <img
                        className="h-10 w-auto"
                        src="images/main.png"
                        alt=""
                      />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400">
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="px-2 pt-2 pb-3 space-y-1">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        id={item.id}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <Link
                    to={routes.start}
                    className="block w-full px-5 py-3 text-center font-medium text-[#013f28] bg-gray-50 hover:bg-gray-100"
                  >
                    Start A FundMe
                  </Link>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <main className="mt-16 sm:mt-24">
            <div className="mx-auto max-w-7xl">
              <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                <div className="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
                  <div>
                    <a
                      href="#"
                      className="inline-flex items-center text-white bg-[#063020] rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-200"
                    >
                      <p className="px-3 py-0.5 text-white text-sm font-semibold leading-5 bg-[#0f865a] rounded-full">
                        Hi there
                      </p>
                      <p className="ml-4 text-sm">Welcome to FundMe</p>
                      <ChevronRightIcon
                        className="ml-2 w-5 h-5 text-gray-500"
                        aria-hidden="true"
                      />
                    </a>
                    <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl sm:tracking-tight md:text-6xl md:tracking-tight">
                      Receive Funds in SGD, GBP & EUR
                    </h1>
                    <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                      FundMe is a platform that gives you access to make
                      donations to different charity organizations and
                      individuals. We are trying to make it easy for individuals
                      and charity homes to recieve donation.
                    </p>
                    <p className="mt-8 text-base text-white font-semibold sm:mt-10">
                      Our Partners
                    </p>
                    <div className="mt-5 w-full sm:mx-auto sm:max-w-lg lg:ml-0">
                      <div className="flex flex-wrap items-start justify-between">
                        <div className="flex justify-center px-1">
                          <img
                            className="h-9 sm:h-10"
                            src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg"
                            alt="Tuple"
                          />
                        </div>
                        <div className="flex justify-center px-1">
                          <img
                            className="h-9 sm:h-10"
                            src="https://tailwindui.com/img/logos/workcation-logo-gray-400.svg"
                            alt="Workcation"
                          />
                        </div>
                        <div className="flex justify-center px-1">
                          <img
                            className="h-9 sm:h-10"
                            src="https://tailwindui.com/img/logos/statickit-logo-gray-400.svg"
                            alt="StaticKit"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
                  <div className="bg-white sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
                    <div className="px-4 py-8 sm:px-10">
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Make A Donation
                        </p>
                        {/* <a
                          href="#"
                          className="inline-flex items-center text-black bg-gray-400 rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base"
                        >
                          <p
                            onClick={() => setActive(true)}
                            className={classNames(
                              "px-3 py-0.5 text-sm",
                              active
                                ? "font-semibold leading-5 bg-black text-white rounded-full"
                                : null
                            )}
                          >
                            Organization
                          </p>
                          <p
                            onClick={() => setActive(false)}
                            className={classNames(
                              "ml-4 text-sm py-0.5 px-3",
                              !active
                                ? "font-semibold leading-5 bg-[black] text-white rounded-full"
                                : null
                            )}
                          >
                            Individual
                          </p>
                        </a> */}
                      </div>

                      <div className="mt-6">
                        <form className="space-y-6">
                          <div>
                            <label htmlFor="wallet" className="sr-only">
                              User Wallet ID
                            </label>
                            <input
                              disabled={walletParam && true}
                              type="text"
                              name="wallet"
                              id="wallet"
                              value={walletParam ? walletId : null}
                              // autoComplete="name"
                              onChange={(e) => setWalletID(e.target.value)}
                              placeholder="User Wallet ID"
                              required
                              className={
                                !walletParam
                                  ? "block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                  : "bg-slate-100 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                              }
                            />
                          </div>
                          {/* <Combobox
                            as="div"
                            value={selectedPerson}
                            onChange={setSelectedPerson}
                          >
                            <div className="relative mt-1">
                              <Combobox.Input
                                placeholder="Select Organization"
                                className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm sm:text-sm"
                                onChange={(event) =>
                                  setQuery(event.target.value)
                                }
                                displayValue={(person) => person?.name}
                              />
                              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                <SelectorIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </Combobox.Button>

                              {filteredPeople.length > 0 && (
                                <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                  {filteredPeople.map((person) => (
                                    <Combobox.Option
                                      key={person.id}
                                      value={person}
                                      className={({ active }) =>
                                        classNames(
                                          "relative cursor-default select-none py-2 pl-3 pr-9",
                                          active
                                            ? "bg-[#0f865a] text-white"
                                            : "text-gray-900"
                                        )
                                      }
                                    >
                                      {({ active, selected }) => (
                                        <>
                                          <span
                                            className={classNames(
                                              "block truncate",
                                              selected && "font-semibold"
                                            )}
                                          >
                                            {person.name}
                                          </span>

                                          {selected && (
                                            <span
                                              className={classNames(
                                                "absolute inset-y-0 right-0 flex items-center pr-4",
                                                active
                                                  ? "text-white"
                                                  : "text-[#0f865a]"
                                              )}
                                            >
                                              <CheckIcon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                              />
                                            </span>
                                          )}
                                        </>
                                      )}
                                    </Combobox.Option>
                                  ))}
                                </Combobox.Options>
                              )}
                            </div>
                          </Combobox> */}

                          <div>
                            <label
                              htmlFor="mobile-or-email"
                              className="sr-only"
                            >
                              Name on card
                            </label>
                            <input
                              type="text"
                              name="card-name"
                              id="card-name"
                              onChange={(e) => setCardName(e.target.value)}
                              placeholder="Name on card"
                              required
                              className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="mobile-or-email"
                              className="sr-only"
                            >
                              Card Number
                            </label>
                            <input
                              type="text"
                              name="card-number"
                              id="card-number"
                              placeholder="Card number"
                              onChange={(e) => setCardNumber(e.target.value)}
                              required
                              className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>

                          <div className="flex flex-row space-x-3">
                            <div className="">
                              <label
                                htmlFor="mobile-or-email"
                                className="sr-only"
                              >
                                Expiration month (MM)
                              </label>
                              <input
                                type="text"
                                name="mobile-or-email"
                                id="mobile-or-email"
                                autoComplete="cc-exp"
                                onChange={(e) => setExpMonth(e.target.value)}
                                placeholder="Expiration month (MM)"
                                required
                                className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>

                            <div className="">
                              <label
                                htmlFor="mobile-or-email"
                                className="sr-only"
                              >
                                Expiration Year
                              </label>
                              <div className="">
                                <input
                                  type="text"
                                  name="exp-year"
                                  id="exp-year"
                                  autoComplete="cc-exp"
                                  onChange={(e) => setExpYear(e.target.value)}
                                  placeholder="Expiration year (YY)"
                                  className="inline-flex w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-row space-x-3">
                            <div>
                              <label htmlFor="cvc" className="sr-only">
                                CVC
                              </label>
                              <input
                                id="cvc"
                                name="cvc"
                                type="text"
                                placeholder="CVC"
                                onChange={(e) => setCvv(e.target.value)}
                                required
                                className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>

                            <div>
                              <label htmlFor="amount" className="sr-only">
                                Amount
                              </label>
                              <input
                                id="amount"
                                name="amount"
                                type="text"
                                placeholder="Amount"
                                onChange={(e) => setAmount(e.target.value)}
                                required
                                className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
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
                              {processing ? "Processing..." : "Donate"}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="px-4 py-4 bg-gray-50 border-t-2 border-gray-200 sm:px-10">
                      <p className="text-xs leading-5 text-gray-500">
                        All Card payments are{" "}
                        <a
                          href="#"
                          className="font-medium text-gray-900 hover:underline"
                        >
                          accepted
                        </a>{" "}
                        <a
                          href="#"
                          className="font-medium text-gray-900 hover:underline"
                        >
                          in
                        </a>{" "}
                        <a
                          href="#"
                          className="font-medium text-gray-900 hover:underline"
                        >
                          SGD only
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <FAQ />
      <Support />
    </>
  );
}
