import superagent from "superagent";
import {appConfig} from "../config/app";


export const http = {
    token : '',

    get: (url, opts = {}) => {
      return superagent.get(appConfig.apiUrl + url);
    },
    post: (url, opts) => {
      return superagent.post(appConfig.apiUrl + url);
    },
    put: (url, opts) => {
      return superagent.put(appConfig.apiUrl + url);
    },
    del: (url, opts) => {
      return superagent.del(appConfig.apiUrl + url);
    }
  };
