import React, { useMemo, useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { useRouter } from "next/navigation";

import { signIn, getUser } from "@/services/auth";

import AuthContext, { initialState } from "./AuthContext";
import { localStorage } from "@/utils/helpers";

function useAuth() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [error, setError] = useState(undefined);

  const { isLoading: meLoading } = useQuery({
    queryKey: "me",
    queryFn: getUser,
    onSuccess: (data) => {
      setUser(data.user);
      router.push("/dashboard/returns");
    },
    onError: (error) => {
      router.push("/");
      setError(error?.response?.data?.error);
    },
    retry: 1,
    enabled: !!localStorage.getItem("token"),
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
  }, []);

  const signOut = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const { mutate, isLoading } = useMutation({
    mutationKey: "signIn",
    mutationFn: signIn,
    onSuccess: ({ jwt }) => {
      localStorage.setItem("token", jwt);
      router.push("/dashboard/returns");
    },
    onError: (error) => setError(error.response.data.error),
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
