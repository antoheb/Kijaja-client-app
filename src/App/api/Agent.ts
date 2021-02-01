import axios from "axios";

axios.defaults.baseURL = "http://161.35.97.194/api";

axios.interceptors.response.use(undefined, (error) => {
  throw error.response;
});

export const test = {
  helloworld: (): Promise<String> =>
    axios.get("/test").then((response) => response.data),
};

export default {
  test,
};
