/**
 * Utilitários de formatação de dados
 */

/**
 * Formata bytes para formato legível (KB, MB, GB)
 * @param {number} bytes - Tamanho em bytes
 * @param {number} decimals - Casas decimais (padrão: 2)
 * @returns {string} - Tamanho formatado (ex: "1.5 MB")
 */
export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

/**
 * Formata porcentagem com casas decimais
 * @param {number} value - Valor entre 0 e 1
 * @param {number} decimals - Casas decimais (padrão: 0)
 * @returns {string} - Porcentagem formatada (ex: "85%")
 */
export const formatPercentage = (value, decimals = 0) => {
  if (value === null || value === undefined) return 'N/A';
  return `${(value * 100).toFixed(decimals)}%`;
};

/**
 * Formata tempo em milissegundos para formato legível
 * @param {number} ms - Tempo em milissegundos
 * @returns {string} - Tempo formatado (ex: "1.5s" ou "250ms")
 */
export const formatProcessingTime = (ms) => {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
};

/**
 * Formata número com separador de milhares
 * @param {number} num - Número a formatar
 * @returns {string} - Número formatado (ex: "1.234")
 */
export const formatNumber = (num) => {
  if (num === null || num === undefined) return '0';
  return num.toLocaleString('pt-BR');
};

/**
 * Trunca texto com reticências
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Comprimento máximo
 * @returns {string} - Texto truncado
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Formata email para exibição
 * @param {string} email - Email completo
 * @returns {string} - Email formatado
 */
export const formatEmail = (email) => {
  if (!email) return '';
  return email.toLowerCase().trim();
};

/**
 * Formata nome próprio (primeira letra maiúscula)
 * @param {string} name - Nome a formatar
 * @returns {string} - Nome formatado
 */
export const formatName = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Formata data para formato brasileiro
 * @param {Date|string} date - Data a formatar
 * @returns {string} - Data formatada (ex: "14/11/2025")
 */
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('pt-BR');
};

/**
 * Formata data e hora para formato brasileiro
 * @param {Date|string} date - Data a formatar
 * @returns {string} - Data e hora formatadas (ex: "14/11/2025 14:30")
 */
export const formatDateTime = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleString('pt-BR');
};
