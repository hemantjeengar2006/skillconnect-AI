import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, 
  LogOut, 
  GraduationCap, 
  Building2, 
  Briefcase, 
  ChevronRight
} from 'lucide-react';

export const DashboardLayout = ({
  role,
  title,
  subtitle,
  menuItems = [],
  activeItem,
  onSelect,
  headerActions,
  children
}) => {
  const { student, college, company, logout } = useAuth();

  const getRoleTheme = () => {
    switch (role) {
      case 'student':
        return {
          name: 'Student Portal',
          userTitle: student.name,
          userSub: `${student.course} • Sem ${student.semester}`,
          avatar: 'RS',
          color: 'var(--student-brand)',
          activeClass: 'active-student',
          badgeClass: 'badge-blue',
          icon: <GraduationCap size={18} />
        };
      case 'college':
        return {
          name: 'College Administration',
          userTitle: college.institutionName,
          userSub: college.deanTPO,
          avatar: 'AI',
          color: 'var(--college-brand)',
          activeClass: 'active-college',
          badgeClass: 'badge-purple',
          icon: <Building2 size={18} />
        };
      case 'company':
      default:
        return {
          name: 'Industry Partner',
          userTitle: company.name,
          userSub: company.contactPerson,
          avatar: 'TC',
          color: 'var(--company-brand)',
          activeClass: 'active-company',
          badgeClass: 'badge-green',
          icon: <Briefcase size={18} />
        };
    }
  };

  const theme = getRoleTheme();

  return (
    <div className="dashboard-shell">
      {/* Sleek Dedicated Sidebar */}
      <aside className="dashboard-sidebar">
        <div>
          {/* Brand & Portal Header */}
          <div className="sidebar-header">
            <div 
              onClick={() => setCurrentPage('gateway')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', marginBottom: '0.75rem' }}
            >
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}>
                <Sparkles size={18} />
              </div>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>
                  SkillBridge
                </div>
                <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                  Academia–Industry Portal
                </div>
              </div>
            </div>

            {/* Active Portal Badge */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.35rem 0.65rem',
              borderRadius: '6px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: theme.color
            }}>
              {theme.icon}
              <span>{theme.name}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="sidebar-nav">
            {menuItems.map(item => {
              const isActive = activeItem === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onSelect(item.id)}
                  className={`sidebar-nav-item ${isActive ? theme.activeClass : ''}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', opacity: isActive ? 1 : 0.7 }}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className={`badge ${isActive ? theme.badgeClass : 'badge-neutral'}`} style={{ fontSize: '0.7rem' }}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer with User Profile & Role Switcher */}
        <div className="sidebar-footer">
          {/* User info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.85rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: '#eff6ff',
              border: '1px solid #bfdbfe',
              color: '#1d4ed8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.85rem',
              flexShrink: 0
            }}>
              {theme.avatar}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {theme.userTitle}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {theme.userSub}
              </div>
            </div>
          </div>

          {/* Sign Out Button - user must log out to switch role */}
          <button
            onClick={logout}
            className="btn btn-sm btn-outline"
            style={{ width: '100%', color: '#dc2626', borderColor: '#fecaca', fontSize: '0.8rem', fontWeight: 600 }}
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="dashboard-main">
        {/* Top Header Bar */}
        <header className="dashboard-topbar">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: '#64748b' }}>
              <span>{theme.name}</span>
              <ChevronRight size={12} />
              <span style={{ color: '#0f172a', fontWeight: 600 }}>{title}</span>
            </div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginTop: '0.1rem' }}>
              {title}
            </h1>
            {subtitle && (
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.15rem' }}>
                {subtitle}
              </p>
            )}
          </div>

          {/* Top Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {headerActions}
          </div>
        </header>

        {/* Dashboard Body Content */}
        <main className="dashboard-body">
          {children}
        </main>
      </div>
    </div>
  );
};
