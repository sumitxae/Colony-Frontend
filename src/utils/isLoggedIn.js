import { jwtDecode } from "jwt-decode";

export const isLoggedIn = (token) => {
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    // const gmtDate = new Date(decoded.exp * 1000);
    // const localDate = gmtDate.toLocaleString("en-GB", {
    //   timeZone: "Asia/Kolkata",
    //   hour12: true,
    // });
    // console.log(localDate);

    return decoded.exp * 1000 > Date.now();
  } catch (e) {
    console.log(e);
    return false;
  }
};
