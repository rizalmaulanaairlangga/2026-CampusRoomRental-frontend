import { createContext } from 'react';

export type ToastContextValue = {
  show: (message: string) => void;
};

export const ToastContext = createContext<ToastContextValue | undefined>(
  undefined
);
