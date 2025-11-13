import axiosInstance from '@/app/api/axiosInstance';

// Visão geral do dashboard
export const getDashboardOverview = async (days = 30) => {
  try {
    const response = await axiosInstance.get(`/api/analytics/dashboard/overview/?days=${days}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard overview:', error);
    throw error;
  }
};

// Tendências ao longo do tempo
export const getDashboardTrends = async (days = 30, granularity = 'daily') => {
  try {
    const response = await axiosInstance.get(`/api/analytics/dashboard/trends/?days=${days}&granularity=${granularity}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard trends:', error);
    throw error;
  }
};

// Distribuição de categorias
export const getDashboardCategories = async (days = 30) => {
  try {
    const response = await axiosInstance.get(`/api/analytics/dashboard/categories/?days=${days}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard categories:', error);
    throw error;
  }
};

// Análise de remetentes
export const getDashboardSenders = async (limit = 10, minEmails = 1) => {
  try {
    const response = await axiosInstance.get(`/api/analytics/dashboard/senders/?limit=${limit}&min_emails=${minEmails}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard senders:', error);
    throw error;
  }
};

// Insights de palavras-chave
export const getDashboardKeywords = async (days = 30, limit = 10) => {
  try {
    const response = await axiosInstance.get(`/api/analytics/dashboard/keywords/?days=${days}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard keywords:', error);
    throw error;
  }
};

// Métricas de performance
export const getDashboardPerformance = async (days = 30) => {
  try {
    const response = await axiosInstance.get(`/api/analytics/dashboard/performance/?days=${days}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard performance:', error);
    throw error;
  }
};

// Lista de emails processados
export const getEmailsList = async (days = 30, category = null, page = 1, perPage = 20) => {
  try {
    let url = `/api/analytics/emails/?days=${days}&page=${page}&per_page=${perPage}`;
    if (category) url += `&category=${category}`;
    
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching emails list:', error);
    throw error;
  }
};
