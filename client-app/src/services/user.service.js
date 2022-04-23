import axios from "axios";

const API_URL = "http://localhost:3000/api/users/"

const getProfile = () => {
  return axios.get(API_URL + "")
};