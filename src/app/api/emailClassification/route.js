import axiosInstance from '../axiosInstance';

export const classifyEmail = async (emailText, senderEmail, senderName) => {
  try {
    const response = await axiosInstance.post('/api/classifier/classify/', {
      email_text: emailText,
      sender_email: senderEmail,
      sender_name: senderName,
    });
    return response.data;
  } catch (error) {
    console.error('Error classifying email:', error);
    throw error;
  }
};

export const summarizeEmail = async (emailText, maxSentences = 3) => {
  try {
    const response = await axiosInstance.post('/api/classifier/summary/', {
      email_text: emailText,
      max_sentences: maxSentences,
    });
    return response.data;
  } catch (error) {
    console.error('Error summarizing email:', error);
    throw error;
  }
};

export const processBatchEmails = async (emails) => {
  try {
    const response = await axiosInstance.post('/api/classifier/batch/', {
      emails,
    });
    return response.data;
  } catch (error) {
    console.error('Error processing batch emails:', error);
    throw error;
  }
};