import config from "../core/config";
import { LOCAL_STORAGE_KEY_PREFIX } from "../core/consts";

const DEFAULT_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

class Api {
  get (endpoint, data = {}) {
    return this.#sendRequest('GET', endpoint, data);
  }

  post (endpoint, data = {}) {
    return this.#sendRequest('POST', endpoint, data);
  }

  patch (endpoint, data = {}) {
    return this.#sendRequest('PATCH', endpoint, data);
  }

  delete (endpoint, data = {}) {
    return this.#sendRequest('DELETE', endpoint, data);
  }

  /**
   * @param {String} method
   * @param {String} endpoint
   * @param {Object} data
   * @return {Promise<Object>}
   */
  #sendRequest = async (method, endpoint, data) => {
    endpoint = endpoint.replace(/^\//, '');
    const headers = {};

    const jwt = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}.jwt`);

    if (jwt !== null) {
      headers['Authorization'] = `Bearer ${jwt}`;
    }

    let response = {
      status: 520,
      errors: [],
      data: null,
    };

    try {
      const res = await fetch(`/${endpoint}`, {
        method,
        headers: {...DEFAULT_HEADERS, ...headers},
        body: ['GET', 'HEAD'].includes(method) ? undefined : JSON.stringify(data),
      });
      response.status = res.status;
      response.data = await res.json();
      if (response.status >= 400) {
        response.errors = response.data || [];
      }
    } catch (err) {
      // @todo do something with errors?
      // console.error(err.message);
    }

    return response;
  };
}

export default new Api();
