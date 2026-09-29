import React from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast = () => {
  const { toast } = useAuth();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'warning':
        return <AlertCircle size={18} color="#d97706" />;
      case 'info':
        return <Info size={18} color="#2563eb" />;
      case 'success':
      default:
        return <CheckCircle2 size={18} color="#16a34a" />;
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'warning': return '#fde68a';
      case 'info': return '#bfdbfe';
      default: return '#bbf7d0';
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '1.25rem',
      right: '1.25rem',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      gap: '0.65rem',
      backgroundColor: '#ffffff',
      border: `1px solid ${getBorderColor()}`,
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
      borderRadius: '10px',
      padding: '0.75rem 1.15rem',
      fontSize: '0.88rem',
      fontWeight: '500',
      color: '#0f172a',
      maxWidth: '420px',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      {getIcon()}
      <span style={{ flex: 1 }}>{toast.message}</span>
    </div>
  );
};
