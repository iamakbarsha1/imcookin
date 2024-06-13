import { APICall } from ".";

export const ax_OAuth_googleSingin = async (data) => {
  try {
    const res = await APICall.post(`/auth/oauth`, data);
    if (res.status === 200 || res.status === 201) {
      console.log("oauth google: ", res);
      return res.data;
    }
    return null;
  } catch (e) {
    console.log("e.response.data -> ", e.response.data);
    if (e.response.status === 404) return e.response.data;
    else return null;
  }
};

export const ax_login = async (data) => {
  try {
    const res = await APICall.post("/auth/login", data);
    if (res.status === 200 || res.status === 201) {
      console.log("login route: -> " + res);
      return res.data;
    }
    return null;
  } catch (e) {
    console.log("e.response.data -> ", e.response.data);
    if (e.response.status === 404) return e.response.data;
    else return null;
  }
};

export const ax_signup = async (query) => {
  try {
    const res = await APICall.post("/auth/signup", query);
    if (res.status === 200 || res.status === 201) {
      console.log("singup route: -> " + res);
      // return res.data;
      return res;
    }
    return null;
  } catch (e) {
    console.log("e.response.data -> " + e.response.data);
    if (e.response.status === 404) return e.response.data;
    else return null;
  }
};
