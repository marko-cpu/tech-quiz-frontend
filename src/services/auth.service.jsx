import axios from "axios";

const API_URL = "http://localhost:9191/api/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios.post(API_URL + "signin", {
      email,
      password,
    })
    .then((response) => {
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
const getCurrentUserRole = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.roles?.includes("ROLE_ADMIN") ? "ADMIN" : "USER";
};



const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  getCurrentUserRole,
};

export default AuthService;