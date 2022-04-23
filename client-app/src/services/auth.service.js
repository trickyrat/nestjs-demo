import axios from "axios";

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
  }).then((response) => {
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;