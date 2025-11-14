/**
 * Custom hook para chamadas de API
 */

import { useState, useCallback } from 'react';
import { ERROR_MESSAGES } from '@/lib/constants';

/**
 * Hook para gerenciar estado de chamadas de API
 * @param {Function} apiFunction - Função que faz a chamada à API
 * @returns {Object} - { data, loading, error, execute, reset }
 */
export const useApi = (apiFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Executa a chamada à API
   * @param {...any} params - Parâmetros para a função da API
   * @returns {Promise} - Promise com os dados ou erro
   */
  const execute = useCallback(async (...params) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await apiFunction(...params);
      setData(result);
      
      return { success: true, data: result };
    } catch (err) {
      console.error('API Error:', err);
      
      // Tratamento de erros por status HTTP
      let errorMessage = ERROR_MESSAGES.GENERIC;
      
      if (err.response) {
        switch (err.response.status) {
          case 400:
            errorMessage = ERROR_MESSAGES.VALIDATION;
            break;
          case 401:
            errorMessage = ERROR_MESSAGES.UNAUTHORIZED;
            break;
          case 404:
            errorMessage = ERROR_MESSAGES.NOT_FOUND;
            break;
          case 500:
            errorMessage = ERROR_MESSAGES.SERVER;
            break;
          default:
            errorMessage = err.response.data?.message || ERROR_MESSAGES.GENERIC;
        }
      } else if (err.request) {
        errorMessage = ERROR_MESSAGES.NETWORK;
      }
      
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  /**
   * Reseta o estado do hook
   */
  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset
  };
};

/**
 * Hook para chamadas de API com retry automático
 * @param {Function} apiFunction - Função que faz a chamada à API
 * @param {Object} options - Opções de configuração
 * @returns {Object} - { data, loading, error, execute, reset, retry }
 */
export const useApiWithRetry = (apiFunction, options = {}) => {
  const { maxRetries = 3, retryDelay = 1000 } = options;
  const [retryCount, setRetryCount] = useState(0);
  const apiState = useApi(apiFunction);

  const executeWithRetry = useCallback(async (...params) => {
    let attempt = 0;
    
    while (attempt < maxRetries) {
      const result = await apiState.execute(...params);
      
      if (result.success) {
        setRetryCount(0);
        return result;
      }
      
      attempt++;
      setRetryCount(attempt);
      
      if (attempt < maxRetries) {
        // Aguarda antes de tentar novamente
        await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
      }
    }
    
    return { success: false, error: apiState.error };
  }, [apiState, maxRetries, retryDelay]);

  const retry = useCallback(() => {
    setRetryCount(0);
    apiState.reset();
  }, [apiState]);

  return {
    ...apiState,
    execute: executeWithRetry,
    retry,
    retryCount
  };
};

/**
 * Hook para múltiplas chamadas de API em paralelo
 * @param {Array<Function>} apiFunctions - Array de funções de API
 * @returns {Object} - { data, loading, error, execute, reset }
 */
export const useParallelApi = (apiFunctions) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...paramsArrays) => {
    try {
      setLoading(true);
      setError(null);
      
      const promises = apiFunctions.map((fn, index) => 
        fn(...(paramsArrays[index] || []))
      );
      
      const results = await Promise.all(promises);
      setData(results);
      
      return { success: true, data: results };
    } catch (err) {
      console.error('Parallel API Error:', err);
      const errorMessage = ERROR_MESSAGES.GENERIC;
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [apiFunctions]);

  const reset = useCallback(() => {
    setData([]);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset
  };
};
