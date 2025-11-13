import axiosInstance from '../axiosInstance';

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