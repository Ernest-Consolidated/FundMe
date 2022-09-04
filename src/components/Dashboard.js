import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../features/auth/authSlice";
import UseAuth from "../hooks/UseAuth";

const Dashboard = () => {
  const { logout } = UseAuth();
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
  return (
    <>
      <div>
        <h3>Dashboard</h3>
        <button
          className="underline"
          onClick={(e) => {
            e.preventDefault();
            logout();
          }}
        >
          Sign Out
        </button>
      </div>
    </>
  );
};

export default Dashboard;
