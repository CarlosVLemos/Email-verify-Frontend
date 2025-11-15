
export const FILE_CONSTRAINTS = {
  MAX_SIZE: 10 * 1024 * 1024, 
  MAX_BATCH_FILES: 50,
  MIN_TEXT_LENGTH: 100,
  VALID_TYPES: [
    'text/plain',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/csv',
    'application/json'
  ],
  VALID_EXTENSIONS: ['.txt', '.csv', '.pdf', '.docx', '.json']
};

export const validateFile = (file) => {
  if (!file) {
    return 'Nenhum arquivo selecionado';
  }


  const isValidType = FILE_CONSTRAINTS.VALID_TYPES.includes(file.type) ||
    FILE_CONSTRAINTS.VALID_EXTENSIONS.some(ext => file.name.endsWith(ext));
  
  if (!isValidType) {
    return `Formato não suportado. Use: ${FILE_CONSTRAINTS.VALID_EXTENSIONS.join(', ')}`;
  }


  if (file.size > FILE_CONSTRAINTS.MAX_SIZE) {
    return `Arquivo muito grande. Máximo: ${FILE_CONSTRAINTS.MAX_SIZE / (1024 * 1024)}MB`;
  }

  return null;
};

export const validateFiles = (files) => {
  const errors = [];
  const fileArray = Array.from(files);


  if (fileArray.length === 0) {
    errors.push('Selecione pelo menos um arquivo');
  }

  if (fileArray.length > FILE_CONSTRAINTS.MAX_BATCH_FILES) {
    errors.push(`Máximo de ${FILE_CONSTRAINTS.MAX_BATCH_FILES} arquivos por vez`);
  }

  
  fileArray.forEach((file, index) => {
    const error = validateFile(file);
    if (error) {
      errors.push(`${file.name}: ${error}`);
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
};

export const validateEmail = (email) => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateEmailText = (text) => {
  if (!text || typeof text !== 'string') {
    return 'Texto inválido';
  }

  if (text.trim().length === 0) {
    return 'Texto não pode estar vazio';
  }

  if (text.length < FILE_CONSTRAINTS.MIN_TEXT_LENGTH) {
    return `Texto muito curto. Mínimo: ${FILE_CONSTRAINTS.MIN_TEXT_LENGTH} caracteres`;
  }

  return null;
};

export const isFile = (obj) => {
  return obj instanceof File;
};

export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const sanitizeString = (str) => {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
};
