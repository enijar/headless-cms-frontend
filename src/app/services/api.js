const DEFAULT_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

class Api {
  #headers = {};

  headers (headers = {}) {
    this.#headers = headers;
    return this;
  }

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
    const headers = {...this.#headers};
    this.#headers = {};
    let response = {
      status: 520,
      data: null,
    };

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {...DEFAULT_HEADERS, ...headers},
        body: JSON.stringify(data),
      });
      response.status = res.status;
      response.data = await res.json();
    } catch (err) {
      // @todo do something with errors?
      // console.error(err.message);
    }

    return response;
  };
}

export default new Api();
