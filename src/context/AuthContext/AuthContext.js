import { createContext } from "react";

export const initialState = {
  user: null,
  error: null,
  loading: false,
};

const AuthContext = createContext(initialState);

export default AuthContext;
