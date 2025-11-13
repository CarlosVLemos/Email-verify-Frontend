import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // Alterado para HTTP para evitar problemas com SSL
  withCredentials: true, // Permite o envio de cookies e credenciais
});

// Interceptor para lidar com FormData automaticamente
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

// Interceptor para log de respostas e erros
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