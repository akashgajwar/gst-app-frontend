import React, { useMemo, useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { useRouter, usePathname } from "next/navigation";

import { signIn, getUser } from "@/services/auth";
import { useLocalStorage } from "@/hooks/useLocalStorage";

import AuthContext from "./AuthContext";

function useAuth() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const path = usePathname();
  const [error, setError] = useState(undefined);
  const route = path.includes("dashboard") ? path : "/dashboard/returns";

  const [token, setToken] = useLocalStorage("token", undefined);

  const { isLoading: meLoading } = useQuery({
    queryKey: "me",
    queryFn: getUser,
    onSuccess: (data) => {
      setUser(data.user);
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
    setToken();
    router.push("/");
    setError();
  };

  const { mutate, isLoading, data: jwtData } = useMutation({
    mutationKey: "signIn",
    mutationFn: signIn,
    onSuccess: ({ jwt }) => {
      setToken(jwt);
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
