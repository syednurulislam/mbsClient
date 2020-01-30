import * as jwtDecode from "jwt-decode";

export function getTokenExpirationValidity() {
  const token =
    JSON.parse(localStorage.getItem("auth")) &&
    JSON.parse(localStorage.getItem("auth"))["token"];

  if (token !== null) {
    if (jwtDecode(token).exp < Date.now() / 1000) {
      localStorage.clear();
      return false;
    }
  }

  return true;
}
