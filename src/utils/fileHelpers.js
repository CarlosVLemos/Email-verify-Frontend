/**
 * Utilitários para manipulação de arquivos
 */

/**
 * Lê conteúdo de arquivo de texto
 * @param {File} file - Arquivo a ser lido
 * @returns {Promise<string>} Conteúdo do arquivo
 */
export const readTextFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(new Error('Erro ao ler arquivo'));
    reader.readAsText(file);
  });
};

/**
 * Gera preview de arquivo de texto (primeiras linhas)
 * @param {File} file - Arquivo a ser visualizado
 * @param {number} maxLines - Número máximo de linhas (padrão: 5)
 * @returns {Promise<string>} Preview do conteúdo
 */
export const generateTextPreview = async (file, maxLines = 5) => {
  try {
    const text = await readTextFile(file);
    const lines = text.split('\n').slice(0, maxLines);
    const preview = lines.join('\n');
    return preview.length > 500 ? preview.substring(0, 500) + '...' : preview;
  } catch (error) {
    throw new Error('Erro ao gerar preview do arquivo');
  }
};

/**
 * Parse de arquivo CSV
 * @param {File} file - Arquivo CSV
 * @returns {Promise<Array<Object>>} Array de objetos com dados do CSV
 */
export const parseCSV = async (file) => {
  try {
    const text = await readTextFile(file);
    const lines = text.trim().split('\n');
    
    if (lines.length === 0) {
      throw new Error('Arquivo CSV vazio');
    }

    // Primeira linha como headers
    const headers = lines[0].split(',').map(h => h.trim());
    
    // Parse das linhas de dados
    const data = lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim());
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = values[index] || '';
      });
      return obj;
    });

    return data;
  } catch (error) {
    throw new Error('Erro ao fazer parse do CSV: ' + error.message);
  }
};

/**
 * Parse de arquivo JSON
 * @param {File} file - Arquivo JSON
 * @returns {Promise<Object|Array>} Dados parseados do JSON
 */
export const parseJSON = async (file) => {
  try {
    const text = await readTextFile(file);
    return JSON.parse(text);
  } catch (error) {
    throw new Error('Erro ao fazer parse do JSON: ' + error.message);
  }
};

/**
 * Valida e extrai emails de arquivo batch
 * @param {File} file - Arquivo com emails
 * @returns {Promise<Array<string>>} Array de emails extraídos
 */
export const extractEmailsFromFile = async (file) => {
  const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
  
  try {
    if (extension === '.json') {
      const data = await parseJSON(file);
      // Assume que JSON é array de objetos com campo 'email_text' ou 'text'
      if (Array.isArray(data)) {
        return data.map(item => item.email_text || item.text || item.content || '');
      }
      return [];
    }
    
    if (extension === '.csv') {
      const data = await parseCSV(file);
      // Assume que CSV tem coluna 'email_text' ou 'text'
      return data.map(row => row.email_text || row.text || row.content || '');
    }
    
    if (extension === '.txt') {
      const text = await readTextFile(file);
      // Divide por linhas vazias duplas ou separador especial
      const emails = text.split(/\n\s*\n/).filter(email => email.trim().length > 0);
      return emails;
    }
    
    throw new Error('Formato de arquivo não suportado');
  } catch (error) {
    throw new Error('Erro ao extrair emails: ' + error.message);
  }
};

/**
 * Converte tamanho de arquivo em bytes para formato legível
 * @param {File} file - Arquivo
 * @returns {string} Tamanho formatado
 */
export const getFileSize = (file) => {
  const bytes = file.size;
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Obtém extensão do arquivo
 * @param {File} file - Arquivo
 * @returns {string} Extensão (ex: '.txt', '.pdf')
 */
export const getFileExtension = (file) => {
  return file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
};

/**
 * Valida múltiplos arquivos
 * @param {FileList|Array<File>} files - Lista de arquivos
 * @param {Object} constraints - Restrições (maxSize, allowedTypes)
 * @returns {Object} { valid: boolean, errors: Array<string> }
 */
export const validateMultipleFiles = (files, constraints = {}) => {
  const {
    maxSize = 10 * 1024 * 1024, // 10MB default
    allowedTypes = ['.txt', '.csv', '.json', '.pdf', '.docx'],
    maxFiles = 10
  } = constraints;

  const errors = [];
  const filesArray = Array.from(files);

  // Verifica número de arquivos
  if (filesArray.length > maxFiles) {
    errors.push(`Máximo de ${maxFiles} arquivos permitidos`);
  }

  // Valida cada arquivo
  filesArray.forEach((file, index) => {
    const extension = getFileExtension(file);
    
    if (!allowedTypes.includes(extension)) {
      errors.push(`Arquivo ${index + 1} (${file.name}): tipo não permitido`);
    }
    
    if (file.size > maxSize) {
      errors.push(`Arquivo ${index + 1} (${file.name}): tamanho excede ${getFileSize({ size: maxSize })}`);
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
};
