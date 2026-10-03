import { useContext } from 'react';
import { ToastContext } from '../context/ToastContextInstance';

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    return {
      success: (msg) => console.log('Toast (success):', msg),
      error: (msg) => console.error('Toast (error):', msg),
      info: (msg) => console.info('Toast (info):', msg)
    };
  }
  return context;
}
