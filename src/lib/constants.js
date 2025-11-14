/**
 * Constantes da aplicação
 */

/**
 * Configurações de categorias de email
 */
export const CATEGORY_CONFIG = {
  'Produtivo': { 
    color: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700', 
    icon: '✓', 
    gradient: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
    label: 'Produtivo',
    description: 'Emails importantes e relevantes para o trabalho'
  },
  'Social': { 
    color: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700', 
    icon: '👥', 
    gradient: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
    label: 'Social',
    description: 'Emails de redes sociais e interações pessoais'
  },
  'Improdutivo': { 
    color: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700', 
    icon: '✗', 
    gradient: 'from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20',
    label: 'Improdutivo',
    description: 'Emails de spam, promoções e conteúdo irrelevante'
  },
};

/**
 * Configurações de tom de email
 */
export const TONE_CONFIG = {
  'Positivo': { 
    color: 'text-green-600 dark:text-green-400', 
    icon: '😊',
    label: 'Positivo'
  },
  'Negativo': { 
    color: 'text-red-600 dark:text-red-400', 
    icon: '😟',
    label: 'Negativo'
  },
  'Neutro': { 
    color: 'text-gray-600 dark:text-gray-400', 
    icon: '😐',
    label: 'Neutro'
  },
};

/**
 * Configurações de urgência de email
 */
export const URGENCY_CONFIG = {
  'Alta': { 
    color: 'bg-red-100 text-red-700 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700', 
    icon: '🔴',
    label: 'Alta',
    priority: 3
  },
  'Média': { 
    color: 'bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700', 
    icon: '🟡',
    label: 'Média',
    priority: 2
  },
  'Baixa': { 
    color: 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700', 
    icon: '🟢',
    label: 'Baixa',
    priority: 1
  },
};

/**
 * Cores de categorias para gráficos
 */
export const CHART_COLORS = {
  'Produtivo': {
    main: '#22c55e',
    light: '#86efac',
    lightBg: '#dcfce7',
    dark: '#16a34a'
  },
  'Social': {
    main: '#3b82f6',
    light: '#93c5fd',
    lightBg: '#dbeafe',
    dark: '#2563eb'
  },
  'Improdutivo': {
    main: '#ef4444',
    light: '#fca5a5',
    lightBg: '#fee2e2',
    dark: '#dc2626'
  }
};

/**
 * Períodos de tempo para filtros
 */
export const TIME_PERIODS = {
  WEEK: { days: 7, label: '7 dias' },
  MONTH: { days: 30, label: '30 dias' },
  QUARTER: { days: 90, label: '90 dias' },
  SEMESTER: { days: 180, label: '180 dias' },
  YEAR: { days: 365, label: '1 ano' }
};

/**
 * URLs da API
 */
export const API_ENDPOINTS = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  CLASSIFY: '/api/email/classify/',
  SUMMARIZE: '/api/email/summarize/',
  BATCH: '/api/email/batch-classify/',
  DASHBOARD: {
    OVERVIEW: '/api/analytics/dashboard/overview/',
    CATEGORIES: '/api/analytics/dashboard/categories/',
    SENDERS: '/api/analytics/dashboard/senders/',
    TRENDS: '/api/analytics/dashboard/trends/',
    KEYWORDS: '/api/analytics/dashboard/keywords/',
    PERFORMANCE: '/api/analytics/dashboard/performance/',
    EMAILS: '/api/analytics/dashboard/emails/'
  }
};

/**
 * Mensagens de erro padrão
 */
export const ERROR_MESSAGES = {
  NETWORK: 'Erro de conexão. Verifique sua internet.',
  SERVER: 'Erro no servidor. Tente novamente mais tarde.',
  VALIDATION: 'Dados inválidos. Verifique e tente novamente.',
  UNAUTHORIZED: 'Acesso não autorizado.',
  NOT_FOUND: 'Recurso não encontrado.',
  GENERIC: 'Algo deu errado. Tente novamente.'
};

/**
 * Mensagens de sucesso padrão
 */
export const SUCCESS_MESSAGES = {
  EMAIL_CLASSIFIED: 'Email classificado com sucesso!',
  BATCH_PROCESSED: 'Lote processado com sucesso!',
  SUMMARY_GENERATED: 'Resumo gerado com sucesso!',
  DATA_SAVED: 'Dados salvos com sucesso!'
};

/**
 * Configurações de paginação
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100]
};

/**
 * Configurações de animação
 */
export const ANIMATION = {
  DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500
  },
  EASING: {
    EASE_IN: 'ease-in',
    EASE_OUT: 'ease-out',
    EASE_IN_OUT: 'ease-in-out'
  }
};

/**
 * Breakpoints responsivos (match Tailwind)
 */
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536
};

/**
 * Storage keys para localStorage
 */
export const STORAGE_KEYS = {
  THEME: 'email-intelligence-theme',
  USER_PREFERENCES: 'email-intelligence-preferences',
  RECENT_SEARCHES: 'email-intelligence-recent-searches'
};
