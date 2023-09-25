import React, { createContext, useEffect, useReducer, useMemo } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { isValidToken, setSession } from "../../Util/jwt";
import AuthReducer from "./AuthContext.reducer";
import { Alert } from "@mui/material";

// Note: If you're trying to connect JWT to your own backend, don't forget
// to remove the Axios mocks in the `/src/pages/_app.js` file.

const INITIALIZE = "INITIALIZE";
const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";

const illegalStateFunction = (...args: any) => {
  throw new Error("You must wrap your components in <AuthProvider />");
};
// let accessToken:any
// if (typeof window !== "undefined") {
//     accessToken = localStorage.getItem("accessToken") || ""
//   }
const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: {},
  signIn: illegalStateFunction,
  signOut: illegalStateFunction,
  signUp: illegalStateFunction,
  resetPassword: illegalStateFunction,
};

export const AuthContext = createContext(initialState);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const useAuth = () => React.useContext(AuthContext);
export default function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const router = useRouter();

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        const isvalid = isValidToken(accessToken);
        if (isValidToken(accessToken) && accessToken !== null) {
          setSession(accessToken);
          axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          const response = await axios.get("http://172.16.15.42:5500/api/user/getUserData");
          const user = response.data.result;
          dispatch({
            type: INITIALIZE,
            payload: {
              isInitialized: true,
              user,
            },
          });
        } else {
          dispatch({
            type: INITIALIZE,
            payload: {
              isInitialized: false,
              user: null,
            },
          });
        }
      } catch (err) {
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const signIn = async (email:any, password:any) => {
    try {
      const response = await axios.post("http://172.16.15.42:5500/api/user/login", {
        email,
        password
      });
      const {token,user} = response.data
      setSession(token);
      dispatch({
        type: SIGN_IN,
        payload: {
          user:user,
          isAuthenticated: true,
        },
      });
      
      //  response;
    return  router.push("/")
    } catch (err: any) {
      dispatch({
        type: SIGN_IN,
        payload: {
          isAuthenticated: false,
          validationErrors: err.error,
        },
      });
    }
  };

  const signOut = async () => {
    setSession(null);
    dispatch({ type: SIGN_OUT });
    router.push("/login");
  };
  return (
    <AuthContext.Provider
      value={useMemo(
        () => ({
          ...state,
          method: "jwt",
          signIn,
          signOut,
        }),
        [state]
      )}
    >
      {children}
    </AuthContext.Provider>
  );
}
