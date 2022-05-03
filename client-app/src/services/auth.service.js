import axios from "axios";
import { Cookies, useCookies } from "react-cookie";

[cookies, setCookie, removeCookie] = useCookies(["jwtCookie"])

const API_URL = "http://localhost:3000/api/auth/";

const register = (username, password, nickname,) => {
  return axios.post(API_URL + "signup", {
    username,
    password,
    nickname
  });
};

const login = (username, password) => {
  return axios.post(API_URL + "login", {
    username,
    password
  }, {
    withCredentials: true
  }).then((res) => {
    localStorage.setItem("currentUser", res.data.data.nickname);
  });
};

const logout = () => {
  localStorage.removeItem("currentUser");
};

const getCurrentUser = () => {
  return localStorage.getItem("currentUser");
};

const refresh = () => {
  axios.post(API_URL + "refresh", {
    cookies
  })
}

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;