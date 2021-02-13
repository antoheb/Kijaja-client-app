import axios from "axios";
import { IAddress } from "../models/address";
import { IAds } from "../models/ads";
import { IUser, IUserFormValues } from "../models/user";

// axios.defaults.baseURL = "https://kijaja.me/api";
axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (error) => {
  throw error.response;
});

const Users = {
  current: (): Promise<IUser> =>
    axios.get("/user").then((response) => response.data),

  login: (user: IUserFormValues): Promise<IUser> =>
    axios.post(`/user/login`, user).then((response) => response.data),

  registerUser: (user: IUserFormValues): Promise<void> =>
    axios.post(`/user/register`, user).then((response) => response.data),

  verifyEmail: (token: string, email: string): Promise<void> =>
    axios.post(`/user/verifyEmail`, { token, email }),

  resendEmailVerification: (email: string): Promise<void> =>
    axios.get(`/user/resendEmailVerification?email=${email}`),

  getMyAds: (): Promise<IAds[]> =>
    axios.get("/user/myAds").then((response) => response.data),

  edit: (values: IUser): Promise<void> =>
    axios.post(`/user/edit`, values).then((response) => response.data),
};

const Address = {
  create: (values: IAddress): Promise<void> =>
    axios.post("/address/", values).then((response) => response.data),

  loadAddress: (): Promise<IAddress> =>
    axios.get("/address").then((response) => response.data),

  modify: (values: IAddress): Promise<void> =>
    axios.post("/address/edit", values).then((response) => response.data),

  delete: (): Promise<void> =>
    axios.post("/address/delete").then((response) => response.data),
};

const Ads = {
  create: (values: IAds): Promise<void> =>
    axios.post("/ads", values).then((response) => response.data),

  modify: (id: string, values: IAds): Promise<void> =>
    axios.put(`/ads/${id}`, values).then((response) => response.data),

  delete: (adId: string): Promise<void> =>
    axios.delete("/ads", {data: {id: adId}}).then((response) => response.data),

  List: (): Promise<IAds[]> =>
    axios.get("/ads").then((response) => response.data),

  Details: (id: string): Promise<IAds> =>
    axios.get(`/ads/${id}`).then((response) => response.data),
};

export default {
  Users,
  Address,
  Ads,
};
