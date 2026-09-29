import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  ArrowRight, 
  Lightbulb, 
  Compass, 
  Target,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const CareerCopilot = () => {
  const { student, currentRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'init-1',
      sender: 'ai',
      text: `Hello ${student?.name?.split(' ')[0] || 'there'}! 👋 I am your **SkillBridge Career Copilot**, grounded in your digital profile and verified skills. How can I assist your career progression today?`,
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // If user is not logged in or not a student, do not show student copilot (or show appropriate copilot)
  if (!currentRole || currentRole !== 'student') {
    return null;
  }

  const promptSuggestions = [
    "What should I learn next for my target career?",
    "Suggest a capstone project for my skill gaps",
    "Explain my current skill gap for Python internships",
    "How do I prepare for the TechCorp interview?"
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Grounded AI response generation
    setTimeout(() => {
      let replyText = "";
      const lower = query.toLowerCase();

      if (lower.includes('learn next') || lower.includes('next skill') || lower.includes('roadmap')) {
        replyText = `Based on your target goal **${student.targetCareer}** and your existing strong foundation in Python (85%) & SQL (72%), your **next critical skill is Django ORM and REST API architecture**. \n\nLearning Django will close your #1 identified skill gap and immediately unlock 4 high-fit internship requisitions!`;
      } else if (lower.includes('project') || lower.includes('capstone')) {
        replyText = `To bridge the gap between academic theory and industry hiring, I recommend building:\n\n**"Hospital OPD Management & REST API"**\n• **Stack:** Python, Django REST Framework, PostgreSQL, Docker\n• **Key Features:** JWT Auth, Doctor slot reservation, automated PDF receipts.\n\nThis project will provide direct demonstration evidence for Django, REST APIs, and database migrations.`;
      } else if (lower.includes('skill gap') || lower.includes('gap')) {
        replyText = `Here is your grounded Skill Gap analysis:\n\n✅ **Verified Strengths:** Python (85%), SQL (72%), Git (68%)\n⚠️ **Critical Gaps:** Django Framework (Missing project proof), RESTful APIs (35% score), Docker (10% score)\n\nClosing Django and REST APIs boosts your placement match score from 78% to 92%!`;
      } else if (lower.includes('interview') || lower.includes('techcorp')) {
        replyText = `For your **TechCorp Solutions (Python Developer)** interview:\n\n1. **Core Python:** Master generator vs iterator, list vs tuple memory allocation, and Python decorators.\n2. **Database:** Explain SQL indexing and the Django ORM N+1 query problem.\n3. **Practical:** Be ready to walk through your *Smart City Traffic Analytics* project.\n\nYou can practice right now in the **AI Mock Interview Simulator** tab!`;
      } else {
        replyText = `I analyzed your verified profile (${student.course}, Sem ${student.semester}, CGPA ${student.cgpa}). You have verified competence in ${student.technicalSkills.slice(0, 3).map(s => s.name).join(', ')}. To maximize your internship conversion rate for **${student.targetCareer}**, focus on building practical backend projects and taking our verified assessments.`;
      }

      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom-Right) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.75rem 1.25rem',
            borderRadius: '9999px',
            background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
            color: '#ffffff',
            border: 'none',
            boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.4), 0 8px 10px -6px rgba(124, 58, 237, 0.3)',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '0.9rem',
            transition: 'transform 0.2s ease',
            animation: 'bounceSubtle 3s infinite'
          }}
        >
          <Sparkles size={18} />
          <span>AI Career Copilot</span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 1000,
          width: '380px',
          maxWidth: 'calc(100vw - 32px)',
          height: isMinimized ? '56px' : '520px',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transition: 'height 0.25s ease'
        }}>
          {/* Header */}
          <div style={{
            padding: '0.75rem 1rem',
            background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Sparkles size={16} />
              </div>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>Career Copilot AI</div>
                <div style={{ fontSize: '0.68rem', color: '#bfdbfe' }}>Grounded in your verified profile</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer', padding: '0.2rem' }}
              >
                {isMinimized ? <Maximize2 size={15} /> : <Minimize2 size={15} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer', padding: '0.2rem' }}
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Message List */}
              <div style={{
                flex: 1,
                padding: '1rem',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                backgroundColor: '#f8fafc'
              }}>
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                    }}
                  >
                    <div style={{
                      maxWidth: '85%',
                      padding: '0.7rem 0.85rem',
                      borderRadius: msg.sender === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                      backgroundColor: msg.sender === 'user' ? '#2563eb' : '#ffffff',
                      color: msg.sender === 'user' ? '#ffffff' : '#0f172a',
                      fontSize: '0.82rem',
                      lineHeight: '1.45',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                      border: msg.sender === 'user' ? 'none' : '1px solid #e2e8f0',
                      whiteSpace: 'pre-wrap'
                    }}>
                      {msg.text}
                    </div>
                    <span style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '0.2rem', padding: '0 0.2rem' }}>
                      {msg.timestamp}
                    </span>
                  </div>
                ))}

                {isTyping && (
                  <div style={{ display: 'flex', gap: '0.35rem', padding: '0.5rem 0.75rem', backgroundColor: '#ffffff', borderRadius: '12px', width: 'fit-content', border: '1px solid #e2e8f0' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2563eb', animation: 'pulse 1s infinite' }}></span>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2563eb', animation: 'pulse 1s infinite 0.2s' }}></span>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2563eb', animation: 'pulse 1s infinite 0.4s' }}></span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Suggestion Chips */}
              <div style={{
                padding: '0.5rem 0.75rem',
                backgroundColor: '#ffffff',
                borderTop: '1px solid #f1f5f9',
                display: 'flex',
                gap: '0.35rem',
                overflowX: 'auto',
                whiteSpace: 'nowrap'
              }}>
                {promptSuggestions.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(p)}
                    style={{
                      fontSize: '0.68rem',
                      padding: '0.25rem 0.55rem',
                      borderRadius: '9999px',
                      backgroundColor: '#f1f5f9',
                      border: '1px solid #e2e8f0',
                      color: '#475569',
                      cursor: 'pointer',
                      flexShrink: 0
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* Chat Input Bar */}
              <div style={{
                padding: '0.65rem 0.75rem',
                backgroundColor: '#ffffff',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                gap: '0.5rem'
              }}>
                <input
                  type="text"
                  placeholder="Ask advice on skills, jobs, or roadmaps..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  style={{
                    flex: 1,
                    padding: '0.45rem 0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.82rem',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={() => handleSend()}
                  style={{
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0 0.75rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Send size={15} />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
