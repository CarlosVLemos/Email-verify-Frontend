/**
 * Custom hook para gerenciar localStorage
 */

import { useState, useEffect, useCallback } from 'react';

/**
 * Hook para persistir estado no localStorage
 * @param {string} key - Chave do localStorage
 * @param {any} initialValue - Valor inicial
 * @returns {[any, Function, Function]} - [value, setValue, removeValue]
 */
export const useLocalStorage = (key, initialValue) => {
  // Estado para armazenar o valor
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Função para atualizar o valor
  const setValue = useCallback((value) => {
    try {
      // Permite que value seja uma função (como setState)
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Função para remover o valor
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
};

/**
 * Hook para sincronizar estado entre abas
 * @param {string} key - Chave do localStorage
 * @param {any} initialValue - Valor inicial
 * @returns {[any, Function]} - [value, setValue]
 */
export const useSyncedLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue, removeValue] = useLocalStorage(key, initialValue);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error('Error syncing localStorage:', error);
        }
      }
    };

    // Escuta mudanças no localStorage de outras abas
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, setStoredValue]);

  return [storedValue, setStoredValue, removeValue];
};

/**
 * Hook para localStorage com expiração
 * @param {string} key - Chave do localStorage
 * @param {any} initialValue - Valor inicial
 * @param {number} expirationMs - Tempo de expiração em milissegundos
 * @returns {[any, Function, Function]} - [value, setValue, removeValue]
 */
export const useLocalStorageWithExpiry = (key, initialValue, expirationMs) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;

      const { value, expiry } = JSON.parse(item);
      
      // Verifica se expirou
      if (expiry && Date.now() > expiry) {
        window.localStorage.removeItem(key);
        return initialValue;
      }
      
      return value;
    } catch (error) {
      console.error(`Error loading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        const item = {
          value: valueToStore,
          expiry: expirationMs ? Date.now() + expirationMs : null
        };
        window.localStorage.setItem(key, JSON.stringify(item));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue, expirationMs]);

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
};
