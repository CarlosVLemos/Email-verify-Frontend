import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '',
  timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT) || 120000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para configurar Content-Type baseado no tipo de dados
axiosInstance.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    // Remove Content-Type para deixar o browser definir (inclui boundary)
    delete config.headers['Content-Type'];
  }
  return config;
});

// Interceptor para tratamento de erros
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error:', {
        status: error.response?.status,
        message: error.message,
        url: error.config?.url,
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
