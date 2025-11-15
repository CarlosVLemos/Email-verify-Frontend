import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000', // Fallback para desenvolvimento
  timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT) || 120000,
  headers: {
    'X-API-Key': process.env.NEXT_PUBLIC_API_KEY,
  },
  withCredentials: true, // Permite o envio de cookies e credenciais
});

axiosInstance.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type']; // Permite que o navegador defina o cabeçalho automaticamente
    console.log('FormData detectado - Content-Type removido para auto-configuração');
  } else {
    // Garante que JSON tenha o Content-Type correto
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }
  }
  
  console.log('Request config:', {
    url: config.url,
    method: config.method,
    contentType: config.headers['Content-Type'],
    isFormData: config.data instanceof FormData
  });
  
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response OK:', response.status);
    return response;
  },
  (error) => {
    console.error('Response Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

export default axiosInstance;