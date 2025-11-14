/**
 * Tipos e enums da aplicação
 */

/**
 * Categorias de email
 */
export const EmailCategory = {
  PRODUTIVO: 'Produtivo',
  SOCIAL: 'Social',
  IMPRODUTIVO: 'Improdutivo'
};

/**
 * Tons de email
 */
export const EmailTone = {
  POSITIVO: 'Positivo',
  NEGATIVO: 'Negativo',
  NEUTRO: 'Neutro'
};

/**
 * Níveis de urgência
 */
export const UrgencyLevel = {
  ALTA: 'Alta',
  MEDIA: 'Média',
  BAIXA: 'Baixa'
};

/**
 * Status de processamento
 */
export const ProcessingStatus = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
};

/**
 * Tipos de input de formulário
 */
export const InputMode = {
  TEXT: 'text',
  FILE: 'file'
};

/**
 * Tipos de visualização de gráfico
 */
export const ChartType = {
  BAR: 'bar',
  PIE: 'pie',
  LINE: 'line'
};

/**
 * Períodos de tempo (em dias)
 */
export const TimePeriod = {
  WEEK: 7,
  MONTH: 30,
  QUARTER: 90,
  SEMESTER: 180,
  YEAR: 365
};

/**
 * Tipos de arquivo suportados
 */
export const SupportedFileTypes = {
  TEXT: '.txt',
  PDF: '.pdf',
  DOCX: '.docx',
  CSV: '.csv',
  JSON: '.json'
};

/**
 * Códigos de status HTTP
 */
export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};
