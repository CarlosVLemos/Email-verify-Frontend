import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
  timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT) || 120000,
  headers: {
    // Header da API key removido temporariamente para evitar erro CORS
    // TODO: Re-adicionar quando o backend estiver configurado para aceitar o header
  },
  // Removido withCredentials temporariamente para evitar problemas CORS
  // withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type']; 
    console.log('FormData detectado - Content-Type removido para auto-configuração');
  } else {
    
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }
  }
  
  console.log('Request config:', {
    url: config.url,
    method: config.method,
    contentType: config.headers['Content-Type'],
    isFormData: config.data instanceof FormData,
    hasApiKey: !!config.headers['x-api-key'],
    environment: process.env.NODE_ENV,
    headers: Object.keys(config.headers), // Debug: mostra todos os headers
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
