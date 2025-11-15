/**
 * Sistema de Toast Notifications
 * Wrapper customizado para react-hot-toast
 */

'use client';

/**
 * Configurações de toast customizadas
 */
export const toastConfig = {
  duration: 4000,
  position: 'top-right',
  
  // Estilos para tema claro/escuro
  style: {
    borderRadius: '12px',
    padding: '16px',
    fontSize: '14px',
    maxWidth: '500px',
  },
  
  // Estilos específicos por tipo
  success: {
    iconTheme: {
      primary: '#22c55e',
      secondary: '#fff',
    },
  },
  error: {
    iconTheme: {
      primary: '#ef4444',
      secondary: '#fff',
    },
  },
};

/**
 * Helper functions para diferentes tipos de toast
 */

/*
export const showToast = {
  success: (message, options = {}) => {
    return toast.success(message, {
      ...toastConfig,
      ...toastConfig.success,
      ...options,
    });
  },

  error: (message, options = {}) => {
    return toast.error(message, {
      ...toastConfig,
      ...toastConfig.error,
      ...options,
    });
  },

  loading: (message, options = {}) => {
    return toast.loading(message, {
      ...toastConfig,
      ...options,
    });
  },

  promise: (promise, messages, options = {}) => {
    return toast.promise(
      promise,
      {
        loading: messages.loading || 'Carregando...',
        success: messages.success || 'Concluído!',
        error: messages.error || 'Erro ao processar',
      },
      {
        ...toastConfig,
        ...options,
      }
    );
  },

  custom: (message, options = {}) => {
    return toast(message, {
      ...toastConfig,
      ...options,
    });
  },

  dismiss: (toastId) => {
    toast.dismiss(toastId);
  },

  dismissAll: () => {
    toast.dismiss();
  },
};
*/

export const showToast = {
  success: (message) => console.log('✅ Success:', message),
  error: (message) => console.error('❌ Error:', message),
  loading: (message) => console.log('⏳ Loading:', message),
  promise: (promise, messages) => {
    console.log('⏳', messages.loading);
    return promise
      .then(() => console.log('✅', messages.success))
      .catch(() => console.error('❌', messages.error));
  },
  custom: (message) => console.log('ℹ️', message),
  dismiss: () => {},
  dismissAll: () => {},
};

/**
 * Componente ToastContainer
 * Adicione no layout principal
 */
export const ToastContainer = () => {
  // Descomentar após instalar
  /*
  return (
    <Toaster
      position={toastConfig.position}
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        className: 'dark:bg-dark-800 dark:text-white',
        style: toastConfig.style,
      }}
    />
  );
  */
  
  return null; // Mock temporário
};

/**
 * Hook customizado para toast
 */
export const useToast = () => {
  return showToast;
};

export default showToast;
