import axios from "axios";

const local_url = `http://localhost:7000/`;

export const APICall = axios.create({
  baseURL: local_url,
  // headers: { "x-tenant-id": x_tenant_id },
  // headers: {
  //   authorization: `bearer ${token}`,
  // },
});
