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
      console.log("login route: -> " + JSON.stringify(res));
      // if (res.data.token) {
      //   document.cookie = `token=${res.data.token}; path=/;`;
      // }
      return res.data;
    }
    return null;
  } catch (e) {
    console.log("e.response.data -> ", e.response.data);
    if (e.response.status === 404) return e.response.data;
    else return null;
  }
};

export const ax_isEmailUsernameUnique = async (query) => {
  try {
    console.log("query -> " + JSON.stringify(query));
    const res = await APICall.post("/auth/isEmailUsernameUnique", query);
    console.log("isEmailUsernameUnique - res : " + JSON.stringify(res));
    if (res.status === 200 || res.status === 201) {
      return res;
    }
    return null;
  } catch (e) {
    console.log();
    if (e.response.status === 404) return e.response.data;
    else return null;
  }
};

export const ax_signup = async (query) => {
  try {
    console.log("query -> " + JSON.stringify(query));
    const res = await APICall.post("/auth/register", query);
    console.log("singup route: -> " + JSON.stringify(res));
    if (res.status === 200 || res.status === 201) {
      // return res.data;
      return res;
    }
    return null;
  } catch (e) {
    console.log("e.response.data -> " + JSON.stringify(e.response.data));
    if (e.response.status === 404) return e.response.data;
    else return null;
  }
};
