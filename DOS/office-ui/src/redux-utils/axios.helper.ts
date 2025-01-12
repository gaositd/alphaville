import axios/*, { AxiosRequestConfig }*/ from 'axios';
// import { TokenStorage } from 'src/shared/utils/token-storage.util';

export function axiosApi(url: string, options: any, onlyData: boolean = true) {
  const modifiedOptions = options || {};
  const headers = modifiedOptions.headers || {};

  modifiedOptions.headers = headers;
  modifiedOptions.url = url;

  // setRequestInterceptors();
  // setResponseInterceptors();

  return axios
    .request(modifiedOptions)
    .then((response) => (onlyData ? response.data : response))
    .then((data) => data)
    .catch((reason) => Promise.reject(reason));
}

/*
function setRequestInterceptors(): void {
  axios.interceptors.request.use(
    (config: AxiosRequestConfig): AxiosRequestConfig => {
      if (config.withCredentials) {
        const token = TokenStorage.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error: any) => { Promise.reject(error) }
  );
}

function setResponseInterceptors(): void {
  axios.interceptors.response.use((response) => {
    // Return a successful response back to the calling service
    return response;
  }, (error) => {
    console.log('error', error.response.status);
    // Return any error which is not due to authentication back to the calling service
    if (error.response.status !== 401) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    // Logout user if token refresh didn't work or user is disabled
    if (error.response.message == 'No se encontró un token en el request') {
      TokenStorage.clear();
    }
    

    // Logout user if token refresh didn't work or user is disabled
    if (error.config.url == '/api/token/refresh' || error.response.message == 'Account is disabled.') {
      
      TokenStorage.clear();
      router.push({ name: 'root' });

      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    // Try request again with new token
    return TokenStorage.getNewToken()
      .then((token) => {

        // New request with new token
        const config = error.config;
        config.headers['Authorization'] = `Bearer ${token}`;

        return new Promise((resolve, reject) => {
          axios.request(config).then(response => {
            resolve(response);
          }).catch((error) => {
            reject(error);
          })
        });

      })
      .catch((error) => {
      	Promise.reject(error);
      });
  });
}
*/
