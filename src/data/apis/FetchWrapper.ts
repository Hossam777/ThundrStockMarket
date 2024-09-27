interface Params {
  [key: string]: any;
}

export default class FetchWrapper {
  baseURL: string;
  defaultHeaders: any;

  constructor(baseURL: string, defaultHeaders: any) {
    this.baseURL = baseURL;
    this.defaultHeaders = defaultHeaders;
  }

  get = (endPoint: string, params: Params = {}, headers: any = {}) => {
    return new Promise((resolve, reject) => {
      let paramsString = '';
      if (Object.keys(params).length) {
        if (this.baseURL.includes('?')) {
          Object.keys(params).forEach(
            key => (paramsString += `&${key}=${params[key]}`),
          );
        } else {
          paramsString = '?';
          Object.keys(params).forEach(
            key => (paramsString += `${key}=${params[key]}&`),
          );
        }
      }

      fetch(this.baseURL + endPoint + paramsString, {
        method: 'GET',
        headers: {
          ...this.defaultHeaders,
          ...headers,
        },
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw response.status;
          }
        })
        .then(resolve)
        .catch(reject);
    });
  };

  post = (endPoint: string, data: Params = {}, headers: any = {}) => {
    return new Promise((resolve, reject) => {
      fetch(this.baseURL + endPoint, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          ...this.defaultHeaders,
          ...headers,
        },
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw response.status;
          }
        })
        .then(resolve)
        .catch(reject);
    });
  };
}
