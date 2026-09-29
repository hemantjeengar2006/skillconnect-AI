import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Award, CheckCircle2, XCircle, Clock, ArrowRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

export const SkillAssessments = () => {
  const { assessmentModules, submitAssessmentScore, student } = useAuth();
  
  const [activeModule, setActiveModule] = useState(null); // null means quiz catalog view
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResult, setQuizResult] = useState(null);

  const startQuiz = (module) => {
    setActiveModule(module);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizResult(null);
  };

  const handleSelectOption = (questionId, optionIndex) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    if (!activeModule) return;

    let correctCount = 0;
    activeModule.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const total = activeModule.questions.length;
    const scorePct = Math.round((correctCount / total) * 100);
    const passed = scorePct >= 60;

    const result = {
      correctCount,
      total,
      scorePct,
      passed,
      skillName: activeModule.skillsImpacted[0]
    };

    setQuizResult(result);
    setQuizSubmitted(true);

    // Save score to student profile
    submitAssessmentScore(activeModule.skillsImpacted[0], scorePct);

    // Confetti celebration if passed with flying colors!
    if (passed) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (_err) {}
    }
  };

  const exitQuiz = () => {
    setActiveModule(null);
    setQuizSubmitted(false);
    setQuizResult(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeIn 0.2s ease-out' }}>
      {/* Catalog Mode */}
      {!activeModule && (
        <>
          <div className="clean-card" style={{ backgroundColor: '#ffffff' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#0284c7', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>
              <Award size={14} /> MODULE 4 • VERIFIED PRACTICAL ASSESSMENTS
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
              Skill Benchmark Assessments
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.86rem', marginTop: '0.25rem', maxWidth: '750px' }}>
              Prove your practical competencies to partner employers. Completing assessments updates your profile to "Verified" status with accredited proficiency badges.
            </p>
          </div>

          <div className="grid-3">
            {assessmentModules.map(mod => {
              // Check if student already has this skill
              const matchedSkill = student.technicalSkills.find(s => 
                mod.skillsImpacted.some(imp => imp.toLowerCase() === s.name.toLowerCase())
              );

              return (
                <div key={mod.id} className="clean-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '2rem' }}>{mod.icon}</span>
                      {matchedSkill?.verified ? (
                        <span className="badge badge-green">✓ Verified ({matchedSkill.score}%)</span>
                      ) : (
                        <span className="badge badge-blue">{mod.difficulty}</span>
                      )}
                    </div>

                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.35rem' }}>
                      {mod.title}
                    </h3>

                    <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.75rem', color: '#64748b', marginBottom: '1rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Clock size={13} /> {mod.durationMinutes} mins
                      </span>
                      <span>•</span>
                      <span>{mod.questionsCount} Questions</span>
                    </div>

                    <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.4, marginBottom: '1rem' }}>
                      Target Skills: <strong>{mod.skillsImpacted.join(", ")}</strong>
                    </p>
                  </div>

                  <div>
                    <button
                      onClick={() => startQuiz(mod)}
                      className="btn btn-student"
                      style={{ width: '100%', fontSize: '0.88rem' }}
                    >
                      {matchedSkill?.verified ? "Retake Assessment" : "Start Assessment"} <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Live Quiz Mode */}
      {activeModule && (
        <div className="clean-card" style={{ backgroundColor: '#ffffff', maxWidth: '850px', margin: '0 auto', width: '100%' }}>
          {/* Quiz Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.25rem' }}>{activeModule.icon}</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                  {activeModule.title}
                </h3>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Question {currentQuestionIndex + 1} of {activeModule.questions.length}
              </span>
            </div>

            <button onClick={exitQuiz} className="btn btn-sm btn-outline" style={{ fontSize: '0.78rem' }}>
              Exit Assessment
            </button>
          </div>

          {/* Results Summary if submitted */}
          {quizSubmitted && quizResult && (
            <div style={{
              backgroundColor: quizResult.passed ? '#ecfdf5' : '#fffbeb',
              border: `1px solid ${quizResult.passed ? '#a7f3d0' : '#fde68a'}`,
              borderRadius: '12px',
              padding: '1.5rem',
              textAlign: 'center',
              marginBottom: '1.5rem'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                {quizResult.passed ? "🎉" : "📚"}
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: quizResult.passed ? '#065f46' : '#92400e', marginBottom: '0.35rem' }}>
                {quizResult.passed ? "Assessment Passed!" : "Assessment Needs Practice"}
              </h3>
              <p style={{ fontSize: '0.9rem', color: quizResult.passed ? '#047857' : '#b45309', marginBottom: '1rem' }}>
                You scored <strong>{quizResult.scorePct}%</strong> ({quizResult.correctCount} out of {quizResult.total} correct).
                Your student profile skill <strong>{quizResult.skillName}</strong> has been updated and verified!
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                <button onClick={exitQuiz} className="btn btn-sm btn-student">
                  Back to Assessments Catalog
                </button>
                <button onClick={() => startQuiz(activeModule)} className="btn btn-sm btn-outline">
                  <RotateCcw size={14} /> Retake Test
                </button>
              </div>
            </div>
          )}

          {/* Question Display */}
          {(!quizSubmitted || quizResult) && (
            <div>
              {activeModule.questions.map((q, idx) => {
                if (!quizSubmitted && idx !== currentQuestionIndex) return null;

                return (
                  <div key={q.id} style={{ marginBottom: '1.75rem', paddingBottom: quizSubmitted ? '1.5rem' : 0, borderBottom: quizSubmitted ? '1px solid #e2e8f0' : 'none' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                      <span style={{ fontWeight: 800, color: '#0284c7' }}>Q{idx + 1}.</span>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.4 }}>
                        {q.question}
                      </h4>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      {q.options.map((option, optIdx) => {
                        const isSelected = selectedAnswers[q.id] === optIdx;
                        const isCorrect = q.correctAnswer === optIdx;

                        let bg = '#f8fafc';
                        let border = '#e2e8f0';
                        let textColor = '#1e293b';

                        if (!quizSubmitted) {
                          if (isSelected) {
                            bg = '#eff6ff';
                            border = '#3b82f6';
                            textColor = '#1d4ed8';
                          }
                        } else {
                          if (isCorrect) {
                            bg = '#ecfdf5';
                            border = '#10b981';
                            textColor = '#065f46';
                          } else if (isSelected && !isCorrect) {
                            bg = '#fef2f2';
                            border = '#ef4444';
                            textColor = '#991b1b';
                          }
                        }

                        return (
                          <div
                            key={optIdx}
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            style={{
                              padding: '0.75rem 1rem',
                              borderRadius: '8px',
                              backgroundColor: bg,
                              border: `1.5px solid ${border}`,
                              cursor: quizSubmitted ? 'default' : 'pointer',
                              fontSize: '0.86rem',
                              fontWeight: isSelected ? 600 : 400,
                              color: textColor,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <span>{option}</span>
                            {quizSubmitted && isCorrect && <CheckCircle2 size={16} color="#10b981" />}
                            {quizSubmitted && isSelected && !isCorrect && <XCircle size={16} color="#ef4444" />}
                          </div>
                        );
                      })}
                    </div>

                    {/* Show explanation if reviewed */}
                    {quizSubmitted && (
                      <div style={{
                        marginTop: '0.75rem',
                        padding: '0.65rem 0.85rem',
                        backgroundColor: '#f1f5f9',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        color: '#475569'
                      }}>
                        💡 <strong>Explanation:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Navigation controls if in quiz mode */}
              {!quizSubmitted && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
                  <button
                    disabled={currentQuestionIndex === 0}
                    onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                    className="btn btn-sm btn-outline"
                    style={{ opacity: currentQuestionIndex === 0 ? 0.4 : 1 }}
                  >
                    ← Previous
                  </button>

                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                    {activeModule.questions.map((_, dotIdx) => (
                      <div
                        key={dotIdx}
                        onClick={() => setCurrentQuestionIndex(dotIdx)}
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          cursor: 'pointer',
                          backgroundColor: dotIdx === currentQuestionIndex ? '#0284c7' :
                            selectedAnswers[activeModule.questions[dotIdx].id] !== undefined ? '#10b981' : '#cbd5e1'
                        }}
                      />
                    ))}
                  </div>

                  {currentQuestionIndex < activeModule.questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                      className="btn btn-sm btn-student"
                    >
                      Next Question →
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitQuiz}
                      className="btn btn-sm btn-student"
                      style={{ backgroundColor: '#16a34a' }}
                    >
                      Submit & Score Test <CheckCircle2 size={15} />
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
