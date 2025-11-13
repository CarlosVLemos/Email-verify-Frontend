import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // Alterado para HTTP para evitar problemas com SSL
  withCredentials: true, // Permite o envio de cookies e credenciais
});

// Interceptor para lidar com FormData automaticamente
axiosInstance.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type']; // Permite que o navegador defina o cabeçalho automaticamente
  }
  return config;
});

export default axiosInstance;