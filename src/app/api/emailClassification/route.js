import axiosInstance from '../axiosInstance';

export const classifyEmail = async (emailText, senderEmail = null, senderName = null) => {
  try {
    const payload = { email_text: emailText };

    // Adiciona campos opcionais apenas se forem fornecidos
    if (senderEmail) payload.sender_email = senderEmail;
    if (senderName) payload.sender_name = senderName;

    const response = await axiosInstance.post('/api/classifier/classify/', payload);
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