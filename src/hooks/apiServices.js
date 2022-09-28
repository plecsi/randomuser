import { useEffect } from "react";
import axios from "axios";

import { useLocalStorage } from "./localStorage.js";
const HOME_URL = "/";

export function useApiService() {
  const { store, readStore } = useLocalStorage();

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
  });

  useEffect(() => {
    const credentials = readStore("credentials");
    if (!credentials) {
      return;
    }

    api.defaults.headers[
      "x-access-token"
    ] = `${credentials.tokenType} ${credentials.accessToken}`;
  }, [readStore, api]);

  const collectionResponseHandler = async (response) =>
    Promise.resolve({
      data: response.data,
      raw: response,
    });

  const singularResponseHandler = async (response) =>
    Promise.resolve({
      data: response.data,
      raw: response,
    });

  const generalErrorHandler = (error) => {
    if (error.response.status === 401) {
      store("credentials", null);
      window.location.href = HOME_URL;
    }

    console.error(`ApiService ${error}`);

    return Promise.reject(error);
  };

  const request = (method, resource, params, config) => {
    return api
      .request({
        method,
        url: `${resource}`,
        params,
        ...config,
      })
      .catch(generalErrorHandler);
  };

  const get = (resource, slug = "", params) => {
    return api
      .request({
        method: "get",
        url: slug ? `${resource}/${slug}` : `${resource}`,
        params,
      })
      .then(singularResponseHandler)
      .catch(generalErrorHandler);
  };

  const query = (resource, params) => {
    return api
      .request({
        method: "get",
        url: `${resource}`,
        params,
      })
      .then(collectionResponseHandler)
      .catch(generalErrorHandler);
  };

  const save = (resource, data, params) => {
    return api
      .request({
        method: "post",
        url: `${resource}`,
        data,
        params,
      })
      .then(singularResponseHandler)
      .catch(generalErrorHandler);
  };

  const update = (resource, slug = "", data, params) => {
    return api
      .request({
        method: "put",
        url: `${resource}/${slug}`,
        data,
        params,
      })
      .then(singularResponseHandler)
      .catch(generalErrorHandler);
  };

  const patch = (resource, slug = "", data, params) => {
    return api
      .request({
        method: "patch",
        url: slug ? `${resource}/${slug}` : resource,
        data,
        params,
      })
      .then(singularResponseHandler)
      .catch(generalErrorHandler);
  };

  const remove = (resource, slug = "") => {
    return api
      .request({
        method: "delete",
        url: `${resource}/${slug}`,
      })
      .then(singularResponseHandler)
      .catch(generalErrorHandler);
  };

  const upload = (resource, file, type, params) => {
    return api
      .request({
        method: "post",
        url: resource,
        data: file,
        headers: {
          "Content-Type": type,
        },
        params,
      })
      .then(singularResponseHandler)
      .catch(generalErrorHandler);
  };

  return {
    request,
    get,
    query,
    save,
    update,
    patch,
    remove,
    upload,
  };
}
