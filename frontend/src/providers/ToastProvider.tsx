import { useState } from 'react';
import { ToastContext } from '../contexts/ToastContext';

type Toast = { id: number; message: string };

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = (message: string) => {
    setToasts(t => [...t, { id: Date.now(), message }]);
  };

  const dismiss = (id: number) => {
    setToasts(t => t.filter(x => x.id !== id));
  };

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div style={{ position: 'fixed', top: 16, right: 16 }}>
        {toasts.map(t => (
          <div
            key={t.id}
            style={{ background: '#333', color: '#fff', padding: 8, marginBottom: 8 }}
          >
            {t.message}
            <button onClick={() => dismiss(t.id)}>✕</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
