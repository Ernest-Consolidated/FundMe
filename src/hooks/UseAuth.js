import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { auth } from "../firebase";

const AuthContext = createContext({
  // InitialState
});

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  // const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const { accessToken, uid, email } = user;
          // if a user is logged in
          dispatch(setUser({ accessToken, uid, email }));
          // console.log(user);
          //   setUserLoaded(true);
        } else {
          // if user logout
          setUser(null);
        }

        setLoadingInitial(false);
      }),

    []
  );

  const signIn = (email, pwd) => {
    signInWithEmailAndPassword(auth, email, pwd)
      .then((userCredential) => {
        if (userCredential) {
          const { accessToken, uid, email } = userCredential.user;
          setUser({ accessToken, uid, email });
        }
      })
      .catch((error) => {
        setError(error);
      });
  };

  const createAccount = (email, pwd) => {
    createUserWithEmailAndPassword(auth, email, pwd)
      .then((userCredential) => {
        if (userCredential) {
          sendEmailVerification(userCredential.user);
        }
      })
      .catch((error) => {
        setError(error);
      });
  };

  const logout = () => {
    setLoading(true);

    signOut(auth)
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const memoedValue = useMemo(
    () => ({
      loading,
      error,
      signIn,
      createAccount,
      logout,
    }),
    [loading, error]
  );
  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function UseAuth() {
  return useContext(AuthContext);
}