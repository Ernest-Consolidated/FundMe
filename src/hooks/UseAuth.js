import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth } from "../firebase";

const AuthContext = createContext({
  // InitialState
});

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // if a user is logged in
          // console.log(user);
          setUser(user);
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
          setUser(userCredential.user);
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
      user,
      loading,
      error,
      signIn,
      createAccount,
      logout,
    }),
    [user, loading, error]
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
