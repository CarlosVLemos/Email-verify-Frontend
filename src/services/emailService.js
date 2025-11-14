/**
 * Serviço de classificação e análise de emails
 */

import axiosInstance from '@/app/api/axiosInstance';

/**
 * Classifica um email usando IA
 * @param {string|FormData} emailTextOrFormData - Texto do email ou FormData com arquivo
 * @param {string} senderEmail - Email do remetente (opcional)
 * @param {string} senderName - Nome do remetente (opcional)
 * @returns {Promise<Object>} Dados da classificação
 */
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

/**
 * Gera resumo executivo de um email
 * @param {string|FormData} emailTextOrFormData - Texto do email ou FormData com arquivo
 * @param {number} maxSentences - Número máximo de sentenças no resumo (padrão: 3)
 * @returns {Promise<Object>} Dados do resumo
 */
export const summarizeEmail = async (emailTextOrFormData, maxSentences = 3) => {
  try {
    let payload;
    
    if (emailTextOrFormData instanceof FormData) {
      payload = emailTextOrFormData;
      if (!payload.has('max_sentences')) {
        payload.append('max_sentences', maxSentences.toString());
      }
    } else {
      payload = {
        email_text: emailTextOrFormData,
        max_sentences: maxSentences,
      };
    }

    const response = await axiosInstance.post('/api/classifier/summary/', payload);
    return response.data;
  } catch (error) {
    console.error('Error summarizing email:', error);
    throw error;
  }
};

/**
 * Processa múltiplos emails em lote
 * @param {Array<Object>} emails - Array de objetos com dados dos emails
 * @returns {Promise<Object>} Resultados do processamento em lote
 */
export const processBatchEmails = async (emails) => {
  try {
    const response = await axiosInstance.post('/api/classifier/batch/', { emails });
    return response.data;
  } catch (error) {
    console.error('Error processing batch emails:', error);
    throw error;
  }
};
