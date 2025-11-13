import axiosInstance from '../axiosInstance';

export const classifyEmail = async (emailTextOrFormData, senderEmail = null, senderName = null) => {
  try {
    let payload;
    if (emailTextOrFormData instanceof FormData) {
      payload = emailTextOrFormData;
      if (senderEmail) payload.append('sender_email', senderEmail);
      if (senderName) payload.append('sender_name', senderName);
    } else {
      payload = { email_text: emailTextOrFormData };
      if (senderEmail) payload.sender_email = senderEmail;
      if (senderName) payload.sender_name = senderName;
    }

    const response = await axiosInstance.post('/api/classifier/classify/', payload);
    return response.data;
  } catch (error) {
    console.error('Error classifying email:', error);
    throw error;
  }
};

export const summarizeEmail = async (emailTextOrFormData, maxSentences = 3) => {
  try {
    let payload;
    
    if (emailTextOrFormData instanceof FormData) {
      // É FormData (arquivo)
      payload = emailTextOrFormData;
      
      // Adiciona max_sentences se não existir
      if (!payload.has('max_sentences')) {
        payload.append('max_sentences', maxSentences.toString());
      }
      
      console.log('Enviando FormData para resumo com arquivo');
    } else {
      // É texto
      payload = {
        email_text: emailTextOrFormData,
        max_sentences: maxSentences,
      };
      
      console.log('Enviando JSON para resumo:', { 
        texto_length: emailTextOrFormData.length, 
        max_sentences: maxSentences 
      });
    }

    const response = await axiosInstance.post('/api/classifier/summary/', payload);
    return response.data;
  } catch (error) {
    console.error('Error summarizing email:', error);
    console.error('Detalhes do erro:', error.response?.data);
    console.error('Field errors:', error.response?.data?.field_errors);
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