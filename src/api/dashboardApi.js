import axiosInstance from './axiosInstance';

export const checkApiHealth = async () => {
  try {
    const response = await axiosInstance.get('/api/classifier/health/');
    return response.data;
  } catch (error) {
    console.error('Error checking API health:', error);
    throw error;
  }
};

export const getDashboardOverview = async (days = 30) => {
  try {
    const response = await axiosInstance.get(`/api/analytics/dashboard/overview/?days=${days}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard overview:', error);
    throw error;
  }
};

export const getDashboardTrends = async (days, granularity) => {
  try {
    const response = await axiosInstance.get(`/api/analytics/dashboard/trends/?days=${days}&granularity=${granularity}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard trends:', error);
    throw error;
  }
};

export const getCategoryDistribution = async (days) => {
  try {
    const response = await axiosInstance.get(`/api/analytics/dashboard/categories/?days=${days}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching category distribution:', error);
    throw error;
  }
};

export const getSenderAnalysis = async (limit, minEmails) => {
  try {
    const response = await axiosInstance.get(`/api/analytics/dashboard/senders/?limit=${limit}&min_emails=${minEmails}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sender analysis:', error);
    throw error;
  }
};

export const getKeywordInsights = async (days, limit) => {
  try {
    const response = await axiosInstance.get(`/api/analytics/dashboard/keywords/?days=${days}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching keyword insights:', error);
    throw error;
  }
};

export const getPerformanceMetrics = async (days) => {
  try {
    const response = await axiosInstance.get(`/api/analytics/dashboard/performance/?days=${days}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching performance metrics:', error);
    throw error;
  }
};

export const getPaginatedEmails = async (category, days, page, perPage) => {
  try {
    const response = await axiosInstance.get(`/api/analytics/emails/?category=${category}&days=${days}&page=${page}&per_page=${perPage}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching paginated emails:', error);
    throw error;
  }
};