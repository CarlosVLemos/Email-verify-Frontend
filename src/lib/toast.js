
'use client';

export const toastConfig = {
  duration: 4000,
  position: 'top-right',
  
  
  style: {
    borderRadius: '12px',
    padding: '16px',
    fontSize: '14px',
    maxWidth: '500px',
  },
  
  
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

export const ToastContainer = () => {
  
  
  return null; 
};

export const useToast = () => {
  return showToast;
};

export default showToast;
