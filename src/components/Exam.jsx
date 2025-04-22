import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebaseConfig';
import { doc, getDoc, setDoc, query, collection, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import '../styles/Exam.css';

export default function Exam() {
  const { examId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [timerStarted, setTimerStarted] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  useEffect(() => {
    const fetchExam = async () => {
      if (!currentUser) {
        setError('Please sign in to take the exam.');
        setLoading(false);
        return;
      }

      try {
        const examDoc = await getDoc(doc(db, 'exams', examId));
        if (!examDoc.exists()) {
          throw new Error('Exam not found');
        }

        const examData = examDoc.data();
        if (!examData || !examData.questions || !Array.isArray(examData.questions)) {
          throw new Error('Invalid exam data: missing or malformed questions field');
        }

        setExam({ id: examDoc.id, ...examData });

        const resultQuery = query(
          collection(db, 'results'),
          where('userId', '==', currentUser.uid),
          where('examId', '==', examId)
        );
        const resultSnapshot = await getDocs(resultQuery);
        if (!resultSnapshot.empty) {
          const resultData = resultSnapshot.docs[0].data();
          if (!resultData.reExamAllowed) {
            setError('You have already taken this exam. Please ask an admin for re-exam permission.');
            navigate('/dashboard');
            return;
          }
        }

        // Set timer to 1 minute per question, minimum 5 minutes (300 seconds)
        const duration = Math.max(300, examData.questions.length * 60);
        setTimeLeft(duration);
        setTimerStarted(true);
      } catch (error) {
        console.error('Error fetching exam:', error);
        setError(error.message || 'Failed to load exam');
      } finally {
        setLoading(false);
      }
    };
    fetchExam();
  }, [examId, currentUser, navigate]);

  useEffect(() => {
    if (timerStarted && timeLeft !== null && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmit(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timerStarted, timeLeft]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (Object.keys(answers).length > 0) {
        const message = 'Leaving the page will submit your answers.';
        e.returnValue = message; // For older browsers
        if (typeof e.returnValue !== 'undefined' && !window.confirm(message)) {
          e.preventDefault();
          return false;
        }
        handleSubmit(true);
      }
    };

    const handlePopState = (e) => {
      if (Object.keys(answers).length > 0) {
        setShowExitConfirm(true);
        e.preventDefault();
        window.history.pushState(null, null, window.location.pathname);
      } else {
        navigate(-1);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    // Prevent initial popstate trigger
    window.history.pushState(null, null, window.location.pathname);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [answers, navigate]);

  const handleAnswerChange = (questionIndex, option) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: option }));
  };

  const handleSubmit = async (isAutoSubmit = false) => {
    if (!isAutoSubmit && Object.keys(answers).length < exam.questions.length) {
      if (!window.confirm('Some questions are unanswered. Submit anyway?')) {
        return;
      }
    }
    try {
      let score = 0;
      exam.questions.forEach((q, index) => {
        if (answers[index] === q.correctAnswer) {
          score += 1;
        }
      });

      const resultData = {
        userId: currentUser.uid,
        examId: exam.id,
        examTitle: exam.title,
        subject: exam.subject,
        answers,
        score,
        totalQuestions: exam.questions.length,
        timestamp: new Date(),
        reExamAllowed: false,
      };

      await setDoc(doc(collection(db, 'results')), resultData);
      navigate(`/result/${examId}/${currentUser.uid}`);
    } catch (error) {
      console.error('Error submitting exam:', error);
      setError('Failed to submit exam: ' + error.message);
    }
  };

  const handleExit = () => {
    if (Object.keys(answers).length > 0) {
      setShowExitConfirm(true);
    } else {
      navigate('/dashboard');
    }
  };

  const confirmExit = () => {
    setShowExitConfirm(false);
    handleSubmit(true);
  };

  const cancelExit = () => {
    setShowExitConfirm(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!exam) return <div className="error-message">Exam not found.</div>;

  return (
    <div className="exam-container container">
      <header className="exam-header sticky-header">
        <h1>{exam.title} ({exam.subject})</h1>
        <div className="exam-controls">
          <button onClick={() => handleSubmit(false)} className="submit-button">
            Submit Exam
          </button>
          <div className="timer">Time Left: {formatTime(timeLeft)}</div>
          <button onClick={handleExit} className="exit-button">Exit</button>
        </div>
      </header>
      <section className="questions-section">
        {exam.questions.map((question, index) => (
          <div className="question-card" key={index}>
            <h2>
              {index + 1}. {question.text}
            </h2>
            <div className="options">
              {question.options.map((option, optIndex) => (
                <label key={optIndex} className="option-label">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={answers[index] === option}
                    onChange={() => handleAnswerChange(index, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
      </section>
      {showExitConfirm && (
        <div className="confirm-popup">
          <div className="confirm-popup-content">
            <h2>Confirm Exit</h2>
            <p>Exiting will submit your answers. Are you sure?</p>
            <div className="confirm-buttons">
              <button onClick={confirmExit} className="confirm-button">Yes</button>
              <button onClick={cancelExit} className="cancel-button">No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Result Page Component (inlined for simplicity, typically separate)
function Result() {
  const { examId, userId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      const resultQuery = query(
        collection(db, 'results'),
        where('examId', '==', examId),
        where('userId', '==', userId)
      );
      const resultSnapshot = await getDocs(resultQuery);
      if (!resultSnapshot.empty) {
        setResult(resultSnapshot.docs[0].data());
      }
      setLoading(false);
    };
    fetchResult();
  }, [examId, userId]);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (!result) return <div className="error-message">Result not found.</div>;

  return (
    <div className="exam-container container">
      <header className="exam-header sticky-header">
        <h1>Exam Result</h1>
        <div className="exam-controls">
          <button onClick={() => navigate('/dashboard')} className="back-button">
            Back to Dashboard
          </button>
        </div>
      </header>
      <section className="questions-section">
        <div className="question-card">
          <h2>Result for {result.examTitle}</h2>
          <p>Score: {result.score}/{result.totalQuestions} ({((result.score / result.totalQuestions) * 100).toFixed(2)}%)</p>
        </div>
      </section>
    </div>
  );
}

export { Exam, Result };