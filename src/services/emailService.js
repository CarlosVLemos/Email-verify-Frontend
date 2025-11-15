import axiosInstance from '@/app/api/axiosInstance';

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

    const response = await axiosInstance.post('/api/classifier/classify', payload);
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

    const response = await axiosInstance.post('/api/classifier/summary', payload);
    return response.data;
  } catch (error) {
    console.error('Error summarizing email:', error);
    throw error;
  }
};

export const processBatchEmails = async (emails) => {
  try {
    const response = await axiosInstance.post('/api/classifier/batch', { emails });
    return response.data;
  } catch (error) {
    console.error('Error processing batch emails:', error);
    throw error;
  }
};

export const generateHuggingFaceResponse = async (emailText, context = null, tone = 'professional', maxLength = 200) => {
  try {
    const payload = {
      email_text: emailText,
      tone: tone,
      max_length: maxLength,
    };

    if (context) {
      payload.context = context;
    }

    const response = await axiosInstance.post('/api/classifier/huggingface-response', payload);
    return response.data;
  } catch (error) {
    console.error('Error generating Hugging Face response:', error);

    // Fallback: gerar resposta simulada quando o backend falhar
    if (error.response?.status === 500) {
      console.log('Backend indisponível, gerando resposta de fallback...');
      return generateFallbackResponse(emailText, context, tone, maxLength);
    }

    throw error;
  }
};

// Função de fallback para gerar respostas quando o backend falhar
const generateFallbackResponse = (emailText, context, tone, maxLength) => {
  // Templates de resposta por tom
  const toneTemplates = {
    professional: [
      "Agradeço pelo contato. Analisei sua mensagem e estou à disposição para ajudar.",
      "Obrigado por entrar em contato. Sua solicitação foi registrada e retornaremos em breve.",
      "Agradecemos seu interesse. Estamos trabalhando para resolver sua questão o mais breve possível."
    ],
    friendly: [
      "Oi! Obrigado por escrever. Vi sua mensagem e vou te ajudar com isso!",
      "E aí? Valeu pelo contato! Sua dúvida é importante e vou resolver pra você.",
      "Que legal você ter entrado em contato! Vamos resolver isso juntos, beleza?"
    ],
    formal: [
      "Prezado(a), agradecemos o contato. Sua mensagem foi devidamente analisada.",
      "Atenciosamente, informamos que sua solicitação foi recebida e será processada.",
      "Temos o prazer de confirmar o recebimento de sua mensagem e agradecemos a atenção."
    ],
    casual: [
      "Oi! Obrigado pela mensagem. Vi aqui e vou dar um jeito nisso pra você.",
      "E aí? Valeu por escrever! Vamos resolver essa parada rapidinho.",
      "Beleza? Recebi sua mensagem e já tô cuidando disso pra você."
    ]
  };

  // Selecionar template aleatório baseado no tom
  const templates = toneTemplates[tone] || toneTemplates.professional;
  const randomTemplate = templates[Math.floor(Math.random() * templates.length)];

  // Adicionar contexto se disponível
  let response = randomTemplate;
  if (context) {
    response += ` ${context.toLowerCase().includes('urgência') ? 'Priorizarei o atendimento desta questão.' : 'Vou analisar com atenção.'}`;
  }

  // Limitar tamanho se necessário
  if (response.length > maxLength) {
    response = response.substring(0, maxLength - 3) + '...';
  }

  return {
    generated_response: response,
    fallback: true,
    tone: tone,
    timestamp: new Date().toISOString()
  };
};
