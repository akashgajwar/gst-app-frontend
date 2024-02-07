import React, { useMemo, useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { useRouter, usePathname } from "next/navigation";

import { signIn, getUser } from "@/services/auth";

import AuthContext from "./AuthContext";
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from "@/utils/localStorage";

function useAuth() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const path = usePathname();
  const [error, setError] = useState(undefined);
  const route = path.includes("dashboard") ? path : "/dashboard/returns";
  const [token, setToken] = useState(getStorageItem("token"));

  const { isLoading: meLoading } = useQuery({
    queryKey: "me",
    queryFn: getUser,
    onSuccess: (user) => {
      setUser(user);
      router.push(route);
    },
    onError: (error) => {
      router.push("/");
      setError(error?.response?.data?.error);
    },
    retry: false,
    enabled: Boolean(token),
  });

  useEffect(() => {
    if (!token) {
      router.push("/");
    } else {
      router.push(route);
    }
  }, []);

  const signOut = () => {
    removeStorageItem("token");
    router.push("/");
    setError();
  };

  const { mutate, isLoading, data } = useMutation({
    mutationKey: "signIn",
    mutationFn: signIn,
    onSuccess: ({ jwt, user }) => {
      setUser(user);
      setToken(jwt);
      setStorageItem("token", jwt);
      router.push("/dashboard/returns");
    },
    onError: (error) => setError(error?.response?.data?.error),
  });

  const memoizedProviderValue = useMemo(
    () => ({
      user,
      error,
      setError,
      meLoading,
      isLoading,
      meLoading,
      mutate,
      signOut,
    }),
    [user, meLoading, error, isLoading, meLoading, mutate, signOut, setError]
  );

  return memoizedProviderValue;
}

const AuthProvider = ({ children }) => (
  <AuthContext.Provider value={useAuth()}>{children}</AuthContext.Provider>
);

export default AuthProvider;
