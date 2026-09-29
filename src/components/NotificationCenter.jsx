import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle2, AlertTriangle, Sparkles, X, Briefcase, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiClient } from '../services/api';

export const NotificationCenter = () => {
  const { currentRole, showToast } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: "notif-1",
      title: "New Python/Full Stack Internship Matching",
      message: "TechCorp Solutions published a requisition matching 82% of your verified skills.",
      timestamp: "10m ago",
      isRead: false,
      type: "opportunity"
    },
    {
      id: "notif-2",
      title: "AI Mock Interview Score Recorded",
      message: "Your Technical Interview score (84%) has been verified to your digital credentials.",
      timestamp: "1h ago",
      isRead: false,
      type: "assessment"
    }
  ]);

  useEffect(() => {
    if (currentRole) {
      apiClient.getNotifications(currentRole).then(data => {
        if (data && data.length > 0) {
          setNotifications(data);
        }
      });
    }
  }, [currentRole]);

  if (!currentRole) return null;

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    showToast("All notifications marked as read");
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: '#f8fafc',
          border: '1px solid #cbd5e1',
          borderRadius: '8px',
          padding: '0.45rem 0.65rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          position: 'relative'
        }}
      >
        <Bell size={17} color="#334155" />
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            backgroundColor: '#ef4444',
            color: '#ffffff',
            fontSize: '0.65rem',
            fontWeight: 800,
            borderRadius: '9999px',
            width: '18px',
            height: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 0 2px #ffffff'
          }}>
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          right: 0,
          top: '42px',
          width: '340px',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 15px 30px -5px rgba(0,0,0,0.18)',
          border: '1px solid #e2e8f0',
          zIndex: 1000,
          overflow: 'hidden',
          animation: 'fadeIn 0.15s ease-out'
        }}>
          <div style={{
            padding: '0.75rem 1rem',
            borderBottom: '1px solid #f1f5f9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f8fafc'
          }}>
            <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Bell size={15} color="#2563eb" /> Notifications ({unreadCount} new)
            </div>
            {unreadCount > 0 && (
              <button onClick={markAllRead} style={{ fontSize: '0.7rem', color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                Mark all read
              </button>
            )}
          </div>

          <div style={{ maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            {notifications.map(n => (
              <div
                key={n.id}
                style={{
                  padding: '0.75rem 1rem',
                  borderBottom: '1px solid #f1f5f9',
                  backgroundColor: n.isRead ? '#ffffff' : '#f0f9ff',
                  transition: 'background 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.2rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>
                    {n.title}
                  </span>
                  <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{n.timestamp}</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#475569', lineHeight: '1.4' }}>
                  {n.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
