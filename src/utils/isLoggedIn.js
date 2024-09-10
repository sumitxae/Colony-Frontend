import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export const isLoggedIn = (token) => {
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch (e) {
    toast.error(e);
    return false;
  }
};
