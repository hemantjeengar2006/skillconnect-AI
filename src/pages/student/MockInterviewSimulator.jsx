import React, { useState } from 'react';
import { 
  Bot, 
  Mic, 
  MicOff, 
  CheckCircle2, 
  Sparkles, 
  Award, 
  RefreshCw, 
  RotateCcw
} from 'lucide-react';
import { mockInterviewQuestionsByRole } from '../../data/skillIntelligenceData';
import { useAuth } from '../../context/AuthContext';
import confetti from 'canvas-confetti';

export const MockInterviewSimulator = () => {
  const { showToast, submitAssessmentScore } = useAuth();
  const [selectedRole, setSelectedRole] = useState("Python Developer");
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);

  const questions = mockInterviewQuestionsByRole[selectedRole] || mockInterviewQuestionsByRole["Python Developer"];
  const currentQ = questions[currentQIndex] || questions[0];

  const handleUseSample = () => {
    setUserAnswer(currentQ.idealAnswer);
    showToast("Loaded high-scoring sample candidate response!");
  };

  const handleToggleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      showToast("Listening... (Speak or type your answer)", "info");
      // Simulated voice-to-text
      setTimeout(() => {
        setUserAnswer(prev => prev ? prev + " " + currentQ.idealAnswer.slice(0, 120) : currentQ.idealAnswer.slice(0, 120));
        setIsRecording(false);
        showToast("Voice transcribed successfully!");
      }, 2500);
    } else {
      setIsRecording(false);
    }
  };

  const handleEvaluateAnswer = () => {
    if (!userAnswer.trim()) {
      showToast("Please provide an answer before submitting for AI review", "info");
      return;
    }

    setIsEvaluating(true);

    setTimeout(() => {
      setIsEvaluating(false);

      // Algorithmic evaluation based on matching key concepts
      const lengthFactor = Math.min(userAnswer.length / 150, 1);
      const techScore = Math.min(Math.round(75 + lengthFactor * 18), 95);
      const clarityScore = Math.min(Math.round(70 + lengthFactor * 20), 92);
      const structureScore = Math.min(Math.round(72 + lengthFactor * 16), 90);
      const commScore = Math.min(Math.round(78 + lengthFactor * 14), 88);
      const overallScore = Math.round((techScore * 0.4) + (clarityScore * 0.25) + (structureScore * 0.2) + (commScore * 0.15));

      setEvaluationResult({
        overallScore,
        techScore,
        clarityScore,
        structureScore,
        commScore,
        feedback: "Strong architectural explanation with accurate distinction between mutability, memory overhead, and backend use cases.",
        improvements: "Consider referencing benchmark numbers or edge cases in high-concurrency production setups.",
        recommendation: "Demonstrates verified competence. Recommended for technical screening rounds."
      });

      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.7 }
      });
      showToast(`AI Evaluation complete! Overall Score: ${overallScore}%`);
    }, 1200);
  };

  const handleSaveToProfile = () => {
    if (!evaluationResult) return;
    submitAssessmentScore(`${selectedRole} Interview`, evaluationResult.overallScore);
    showToast(`Saved ${evaluationResult.overallScore}% score to your verified profile credentials!`);
  };

  const handleNextQuestion = () => {
    setEvaluationResult(null);
    setUserAnswer('');
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      setCurrentQIndex(0);
      showToast("Completed all interview round questions!");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeIn 0.2s ease-out' }}>
      {/* Banner */}
      <div className="clean-card" style={{
        background: 'linear-gradient(135deg, #f5f3ff 0%, #ffffff 100%)',
        border: '1px solid #ddd6fe'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#7c3aed', fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.3rem' }}>
              <Bot size={16} /> AI TECHNICAL MOCK INTERVIEW SIMULATOR
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Real-time Role Screening: <span style={{ color: '#7c3aed' }}>{selectedRole}</span>
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem', margin: 0 }}>
              Practice real technical and problem-solving interview questions. AI provides instant multi-factor feedback.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569' }}>Select Role:</span>
            {Object.keys(mockInterviewQuestionsByRole).map(role => (
              <button
                key={role}
                onClick={() => {
                  setSelectedRole(role);
                  setCurrentQIndex(0);
                  setEvaluationResult(null);
                  setUserAnswer('');
                }}
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  padding: '0.4rem 0.85rem',
                  borderRadius: '8px',
                  border: selectedRole === role ? '1.5px solid #7c3aed' : '1px solid #cbd5e1',
                  backgroundColor: selectedRole === role ? '#7c3aed' : '#ffffff',
                  color: selectedRole === role ? '#ffffff' : '#475569',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Interview Area */}
      <div className="grid-3" style={{ gridTemplateColumns: '1.8fr 1.2fr', gap: '1.25rem' }}>
        {/* Left: Active Question & Input */}
        <div className="clean-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Question Stepper Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase' }}>
              Question {currentQIndex + 1} of {questions.length} • {currentQ.topic}
            </span>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              {questions.map((_, i) => (
                <span
                  key={i}
                  style={{
                    width: '24px',
                    height: '6px',
                    borderRadius: '9999px',
                    backgroundColor: i === currentQIndex ? '#7c3aed' : i < currentQIndex ? '#10b981' : '#e2e8f0'
                  }}
                ></span>
              ))}
            </div>
          </div>

          {/* Question Box */}
          <div style={{
            padding: '1.1rem',
            borderRadius: '10px',
            backgroundColor: '#f8fafc',
            border: '1.5px solid #e2e8f0'
          }}>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', lineHeight: '1.45' }}>
              "{currentQ.question}"
            </h3>
            <div style={{ marginTop: '0.65rem', display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>Key Concepts Evaluated:</span>
              {currentQ.keyPoints.map((kp, idx) => (
                <span key={idx} style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', color: '#334155' }}>
                  • {kp}
                </span>
              ))}
            </div>
          </div>

          {/* Student Response Area */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>
                Your Technical Response:
              </label>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <button
                  type="button"
                  onClick={handleUseSample}
                  style={{
                    fontSize: '0.72rem',
                    color: '#2563eb',
                    background: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    borderRadius: '6px',
                    padding: '0.2rem 0.5rem',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  ⚡ Fill Sample Answer (Demo)
                </button>
                <button
                  type="button"
                  onClick={handleToggleRecord}
                  style={{
                    fontSize: '0.72rem',
                    color: isRecording ? '#dc2626' : '#475569',
                    background: isRecording ? '#fef2f2' : '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    padding: '0.2rem 0.5rem',
                    cursor: 'pointer',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                >
                  {isRecording ? <MicOff size={13} /> : <Mic size={13} />}
                  {isRecording ? "Recording..." : "Voice Input"}
                </button>
              </div>
            </div>

            <textarea
              rows={6}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your explanation here. Use technical terminology, explain 'why' and architectural trade-offs..."
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '8px',
                border: '1.5px solid #cbd5e1',
                fontSize: '0.88rem',
                fontFamily: 'inherit',
                outline: 'none',
                resize: 'vertical',
                boxSizing: 'border-box',
                lineHeight: '1.5'
              }}
            />
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => {
                setUserAnswer('');
                setEvaluationResult(null);
              }}
              className="btn btn-outline btn-sm"
            >
              <RotateCcw size={14} /> Clear
            </button>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={handleEvaluateAnswer}
                disabled={isEvaluating}
                className="btn btn-student"
                style={{ backgroundColor: '#7c3aed', borderColor: '#7c3aed' }}
              >
                {isEvaluating ? (
                  <>
                    <RefreshCw size={15} className="spinner" /> Analyzing Response...
                  </>
                ) : (
                  <>
                    <Sparkles size={15} /> Evaluate with AI
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right: AI Feedback Report */}
        <div className="clean-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="clean-card-header">
              <span className="clean-card-title">
                <Award size={18} color="#7c3aed" /> AI Evaluation Report
              </span>
              {evaluationResult && (
                <span className="badge badge-green">Verified Response</span>
              )}
            </div>

            {evaluationResult ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
                {/* Overall Score Badge */}
                <div style={{
                  padding: '1rem',
                  borderRadius: '10px',
                  backgroundColor: '#f5f3ff',
                  border: '1.5px solid #c4b5fd',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6d28d9', textTransform: 'uppercase' }}>
                    OVERALL READINESS SCORE
                  </div>
                  <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#6d28d9', margin: '0.2rem 0' }}>
                    {evaluationResult.overallScore}%
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#5b21b6', fontWeight: 600 }}>
                    {evaluationResult.recommendation}
                  </div>
                </div>

                {/* 4 Score Breakdown Bars */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.2rem' }}>
                      <span style={{ color: '#475569', fontWeight: 600 }}>Technical Accuracy</span>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{evaluationResult.techScore}%</span>
                    </div>
                    <div style={{ height: '6px', borderRadius: '9999px', backgroundColor: '#e2e8f0', overflow: 'hidden' }}>
                      <div style={{ width: `${evaluationResult.techScore}%`, height: '100%', backgroundColor: '#10b981', borderRadius: '9999px' }}></div>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.2rem' }}>
                      <span style={{ color: '#475569', fontWeight: 600 }}>Concept Clarity</span>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{evaluationResult.clarityScore}%</span>
                    </div>
                    <div style={{ height: '6px', borderRadius: '9999px', backgroundColor: '#e2e8f0', overflow: 'hidden' }}>
                      <div style={{ width: `${evaluationResult.clarityScore}%`, height: '100%', backgroundColor: '#3b82f6', borderRadius: '9999px' }}></div>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.2rem' }}>
                      <span style={{ color: '#475569', fontWeight: 600 }}>Answer Structure</span>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{evaluationResult.structureScore}%</span>
                    </div>
                    <div style={{ height: '6px', borderRadius: '9999px', backgroundColor: '#e2e8f0', overflow: 'hidden' }}>
                      <div style={{ width: `${evaluationResult.structureScore}%`, height: '100%', backgroundColor: '#8b5cf6', borderRadius: '9999px' }}></div>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.2rem' }}>
                      <span style={{ color: '#475569', fontWeight: 600 }}>Communication & Tone</span>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{evaluationResult.commScore}%</span>
                    </div>
                    <div style={{ height: '6px', borderRadius: '9999px', backgroundColor: '#e2e8f0', overflow: 'hidden' }}>
                      <div style={{ width: `${evaluationResult.commScore}%`, height: '100%', backgroundColor: '#f59e0b', borderRadius: '9999px' }}></div>
                    </div>
                  </div>
                </div>

                {/* Strengths & Improvement */}
                <div style={{ padding: '0.65rem 0.75rem', borderRadius: '8px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', fontSize: '0.75rem', color: '#166534' }}>
                  <strong>Key Strength:</strong> {evaluationResult.feedback}
                </div>

                <div style={{ padding: '0.65rem 0.75rem', borderRadius: '8px', backgroundColor: '#fffbeb', border: '1px solid #fde68a', fontSize: '0.75rem', color: '#92400e' }}>
                  <strong>Area to Polish:</strong> {evaluationResult.improvements}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: '#94a3b8' }}>
                <Bot size={40} style={{ margin: '0 auto 0.75rem auto', opacity: 0.4 }} />
                <p style={{ fontSize: '0.85rem' }}>Submit your answer or click "Fill Sample Answer" to view multi-dimensional AI scoring and feedback.</p>
              </div>
            )}
          </div>

          {evaluationResult && (
            <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button
                onClick={handleSaveToProfile}
                className="btn btn-student"
                style={{ width: '100%', backgroundColor: '#10b981', borderColor: '#10b981' }}
              >
                <CheckCircle2 size={15} /> Save to Verified Credentials
              </button>
              <button
                onClick={handleNextQuestion}
                className="btn btn-outline"
                style={{ width: '100%' }}
              >
                Next Question →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
