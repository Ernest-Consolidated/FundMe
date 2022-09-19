import { async } from "@firebase/util";
import axios from "axios";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../features/auth/authSlice";
import { db } from "../firebase";
import Banner from "./Banner";
import Card from "./Card";
import Header from "./Header";
import Spinner from "./Spinner";
import Stats from "./Stats";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { onBoarding, isError, message, user, uid, walletDetails } =
    useSelector((state) => state.auth);
  const [walletInfo, setWalletInfo] = useState();
  const [accountInfo, setAccountInfo] = useState();
  const [cardDetails, setCardDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [accountBalance, setAccountBalance] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user || !uid) {
      navigate("/login");
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  useEffect(() => {
    if (uid) {
      const unsub = onSnapshot(
        collection(db, "users", uid, "wallet"),
        (snapshot) => {
          setWalletInfo(
            snapshot?.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
          setLoading(false);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (!walletInfo) return;

    if (!walletInfo[0].data.onboarding) {
      navigate("/onboarding");
    }
  }, [navigate]);

  useEffect(() => {
    if (uid) {
      const unsub = onSnapshot(
        collection(db, "users", uid, "virtualAccounts"),
        (snapshot) => {
          setAccountInfo(
            snapshot?.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
          setLoading(false);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (uid) {
      const unsub = onSnapshot(
        collection(db, "users", uid, "virtualCards"),
        (snapshot) => {
          setCardDetails(
            snapshot?.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
          setLoading(false);
        }
      );
    }
  }, []);

  if (cardDetails) {
    console.log(cardDetails);
  }

  const ACCOUNT_API_URI =
    "https://help-fd14d.uc.r.appspot.com/api/virtual_account";
  const CARD_API_URI = "https://help-fd14d.uc.r.appspot.com/api/card";

  const handleCard = async () => {
    setLoading(true);
    const body = {
      // country: walletInfo[0]?.data.contacts.data[0].country,
      ewallet_contact: walletInfo[0]?.data.contacts.data[0].id,
    };
    const res = await axios.post(CARD_API_URI, body);

    await addDoc(collection(db, "users", uid, "virtualCards"), {
      ...res.data,
    }).then(() => setLoading(false));
    console.log(res.data);
  };

  const walletId = walletInfo && walletInfo[0].data.id;
  const contactId = walletInfo && walletInfo[0].data.contacts.data[0].id;

  // console.log({ walletId, contactId });

  const handleVirtualAccount = async () => {
    setLoading(true);
    const body = {
      ewallet: walletId,
    };

    const res = await axios.post(ACCOUNT_API_URI, body);
    console.log(res.data);

    await addDoc(collection(db, "users", uid, "virtualAccounts"), {
      ...res.data,
    }).then(() => setLoading(false));
  };

  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    async function fetchData() {
      const wallet = walletInfo && walletInfo[0].data.id;
      const BALANCE_URI =
        "https://help-fd14d.uc.r.appspot.com/api/retrieve_balance";
      const res = await axios.post(BALANCE_URI, { wallet });
      // console.log(res.data);
      setAccountBalance(res.data);
    }

    fetchData();
  }, [walletInfo]);

  if (loading) {
    return <Spinner />;
  }

  // console.log(accountBalance && accountBalance.length);
  const newArr = accountBalance
    ?.filter((acc) => acc.balance !== "SGD")
    .map((acc) => acc.balance);

  return (
    <div className="container">
      <Header />
      <div className="items-start justify-start flex py-3">
        <h3>{`Welcome, ${walletInfo[0]?.data.first_name} ${walletInfo[0]?.data.last_name}`}</h3>
      </div>
      {cardDetails && cardDetails[0]?.data.status === "INA" && (
        <div className="my-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleCard();
              console.log("sent");
            }}
            className="block max-w-sm mt-3 lg:mt-0 py-2 text-xs items-center justify-start bg-[#013f28] cursor-pointer rounded-md"
          >
            <p className="mx-3 text-white">Activate Card</p>
          </button>
        </div>
      )}
      <div className="flex flex-col-reverse lg:flex-row  justify-between">
        <div className="flex flex-col justify-around my-6 lg:my-0 lg:space-y-0">
          <div className="flex flex-col items-start justify-start space-y-1 lg:space-y-0">
            <h4 className="font-semibold">Wallet ID</h4>
            <div className="block py-2 max-w-sm text-xs items-center justify-start bg-gray-300 rounded-md">
              <p className="mx-3">{`${walletInfo[0]?.data.id}`}</p>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start space-y-2 lg:space-y-0">
            {accountInfo.length !== 0 ? (
              <>
                <h4 className="font-semibold">Bank Account Number</h4>
                <div className="block max-w-sm py-2 text-xs items-center justify-start bg-gray-300 rounded-md">
                  <p className="mx-3">{accountInfo[0]?.data.id}</p>
                </div>
              </>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleVirtualAccount();
                  console.log("went");
                }}
                className="block max-w-sm mt-3 lg:mt-0 py-2 text-xs items-center justify-start bg-[#013f28] cursor-pointer rounded-md"
              >
                <p className="mx-3 text-white">Create USD account</p>
              </button>
            )}
          </div>
          <div className="flex flex-col items-start justify-start space-y-2 lg:space-y-0">
            {cardDetails.length !== 0 ? (
              <>
                <h4 className="font-semibold">Card ID</h4>
                <div className="block py-2 max-w-sm text-xs items-center justify-start bg-gray-300 rounded-md">
                  <p className="mx-3">{cardDetails[0]?.data.id}</p>
                </div>
              </>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleCard();
                  console.log("sent");
                }}
                className="block max-w-sm mt-3 lg:mt-0 py-2 text-xs items-center justify-start bg-[#013f28] cursor-pointer rounded-md"
              >
                <p className="mx-3 text-white">Create USD Card</p>
              </button>
            )}
          </div>
        </div>
        <div className="items-center lg:items-end md:px-2 flex">
          <Card
            fName={walletInfo[0]?.data.first_name}
            lName={walletInfo[0]?.data.last_name}
            details={cardDetails && cardDetails}
          />
        </div>
      </div>
      {accountBalance <= 0 ? (
        <div className="mt-8">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            No available balance
          </h3>
        </div>
      ) : (
        <Stats accBalance={accountBalance} />
      )}

      <div className="flex flex-col lg:flex-row items-center justify-center my-5">
        <div
          onClick={handleClick}
          className="w-auto ml-2 mb-3 animate-bounce flex justify-center py-1 px-3 border border-transparent rounded-md shadow-sm text-sm font-normal bg-gray-400"
        >
          Copy: {`https://help-fd14d.web.app/?data=${walletInfo[0]?.data.id}`}
        </div>
      </div>

      <Banner ewallet={walletId} contact={contactId} />
    </div>
  );
};

export default Dashboard;
