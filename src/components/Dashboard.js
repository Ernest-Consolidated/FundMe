import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../features/auth/authSlice";
import Card from "./Card";
import Header from "./Header";
import Stats from "./Stats";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { onBoarding, isError, message, user } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    if (!onBoarding) {
      navigate("/onboarding");
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, onBoarding, dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <div className="container">
      <Header />
      <div className="items-start justify-start flex py-3">
        <h3>Welcome, Nnaemeka Onukwube</h3>
      </div>
      <div className="flex flex-col-reverse lg:flex-row  justify-between">
        <div className="flex flex-col justify-around my-6 lg:my-0 lg:space-y-0">
          <div className="flex flex-col items-start justify-start space-y-1 lg:space-y-0">
            <h4 className="font-semibold">Wallet ID</h4>
            <div className="block py-2 max-w-sm text-xs items-center justify-start bg-gray-300 rounded-md">
              <p className="mx-3">
                ewallet_c4450ec162dc72bb068b19194f024d91sfkssd
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start space-y-2 lg:space-y-0">
            <h4 className="font-semibold">Bank Account Number</h4>
            <div className="block max-w-sm py-2 text-xs items-center justify-start bg-gray-300 rounded-md">
              <p className="mx-3">issuing_uwuoituwwetwuoew</p>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start space-y-2 lg:space-y-0">
            <h4 className="font-semibold">Card ID</h4>
            <div className="block py-2 max-w-sm text-xs items-center justify-start bg-gray-300 rounded-md">
              <p className="mx-3">cardId_uwuoituwwetwuoew</p>
            </div>
          </div>
        </div>
        <div className="items-center lg:items-end md:px-2 flex">
          <Card />
        </div>
      </div>
      <Stats />
      <div className="flex items-center justify-center my-6">
        <button
          onClick={handleClick}
          className="w-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold bg-gray-400"
        >
          View Payment Link
        </button>
      </div>
      {isOpen && (
        <div className="flex items-center justify-center my-3">
          <div className="flex py-2 max-w-lg text-xs items-center justify-start bg-gray-300 rounded-md">
            <p className="mx-3">
              http://localhost:3000/?data=ewallet_c4450ec162dc72bb068b19194f024d91sfkssd
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
