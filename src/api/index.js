import axios from "axios";

const local_url = `http://localhost:7000/`;

const getCookie = (name) => {
  const value = `; ${document.token}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) return parts.pop().split(";").shift();
};

export const APICall = axios.create({
  baseURL: local_url,
  withCredentials: true, // Ensures cookies are sent with requests
  // headers: { "x-tenant-id": x_tenant_id },
  // headers: {
  //   authorization: `bearer ${token}`,
  // },
});

APICall.interceptors.request.use(
  (config) => {
    const token = getCookie("token"); // Function to get the token from cookies
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
