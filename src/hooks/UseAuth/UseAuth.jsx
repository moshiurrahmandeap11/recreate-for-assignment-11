import { useContext } from "react";
import { AuthContext } from "../../routes/AuthContext/AuthContext";

export const useAuth = () => {
  return useContext(AuthContext);
};
