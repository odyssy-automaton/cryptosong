import axios from "axios";

const BaseUrl = () => {
  const host =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_API_HOST_DEV
      : process.env.REACT_APP_API_HOST_PROD;

  return host;
};

export const get = async endpoint => {
  const baseURL = BaseUrl();

  const instance = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" }
  });
  try {
    return await instance.get(`/${endpoint}`);
  } catch (err) {
    throw new Error(err);
  }
};

export const post = async (endpoint, payload) => {
  const baseURL = BaseUrl();

  const instance = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" }
  });
  try {
    return await instance.post(`/${endpoint}`, payload);
  } catch (err) {
    return err.response;
  }
};

export const put = async (endpoint, payload) => {
  const baseURL = BaseUrl();

  const instance = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" }
  });
  try {
    return await instance.put(`/${endpoint}`, payload);
  } catch (err) {
    throw new Error(err);
  }
};

export const patch = async (endpoint, payload) => {
  const baseURL = BaseUrl();

  const instance = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" }
  });
  try {
    return await instance.patch(`/${endpoint}`, payload);
  } catch (err) {
    throw new Error(err);
  }
};
