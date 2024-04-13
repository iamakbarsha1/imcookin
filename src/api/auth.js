import { APICall } from ".";

export const OAuth_googleSingin = async (data) => {
  try {
    const res = await APICall.post(`/post/oauth/google`);
    if (res.status === 200 || res.status === 201) {
      console.log("oauth google: ", res);
      return res.data;
    }
    return null;
  } catch (e) {
    console.log("e.response.data", e.response.data);
    if (e.response.status === 404) {
      return e.response.data;
    } else {
      return null;
    }
  }
};
