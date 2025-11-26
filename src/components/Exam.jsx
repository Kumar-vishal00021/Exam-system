import { useCallback, useEffect, useState } from 'react';
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
  const [showReExamPopup, setShowReExamPopup] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailSentMessage, setEmailSentMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch Exam
  useEffect(() => {
    const fetchExam = async () => {
      if (!currentUser) {
        setError('Please sign in to take the exam.');
        setLoading(false);
        return;
      }

      try {
        const examDoc = await getDoc(doc(db, 'exams', examId));
        if (!examDoc.exists()) throw new Error('Exam not found');

        const examData = examDoc.data();
        if (!examData?.questions || !Array.isArray(examData.questions)) {
          throw new Error('Invalid exam data');
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
            setShowReExamPopup(true);
            return;
          }
        }

        const duration = Math.max(300, Math.ceil(examData.questions.length / 2) * 60);
        setTimeLeft(duration);
        setTimerStarted(true);
      } catch (err) {
        setError(err.message || 'Failed to load exam');
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [examId, currentUser]);

  // Submit Exam — FIXED
  const handleSubmit = useCallback(
    async (isAutoSubmit = false) => {
      if (isSubmitted) return alert('Exam already submitted.');

      if (!isAutoSubmit && Object.keys(answers).length < exam.questions.length) {
        if (!window.confirm('Some questions are unanswered. Submit anyway?')) return;
      }

      try {
        let score = 0;
        exam.questions.forEach((q, index) => {
          if (answers[index] === q.correctAnswer) score += 1;
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

        // Store per user per exam result
        await setDoc(doc(db, 'results', `${currentUser.uid}_${exam.id}`), resultData);

        setIsSubmitted(true);
        setEmailSentMessage(
          'An email with your exam results has been sent to your registered email address.'
        );
        navigate(`/result/${examId}/${currentUser.uid}`);
      } catch (err) {
        setError('Failed to submit exam: ' + err.message);
      }
    },
    [answers, exam, currentUser?.uid, examId, navigate, isSubmitted]
  );

  // Timer — FIXED dependencies
  useEffect(() => {
    if (!timerStarted || timeLeft === null || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timerStarted, timeLeft, handleSubmit]);

  // Exit / refresh warning — FIXED dependencies
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!isSubmitted) {
        e.preventDefault();
        e.returnValue = '';
        handleSubmit(true);
      }
    };

    const handlePopState = () => {
      if (!isSubmitted) {
        setShowExitConfirm(true);
        window.history.pushState(null, null, window.location.pathname);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);
    window.history.pushState(null, null, window.location.pathname);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isSubmitted, handleSubmit]);

  const handleAnswerChange = (questionIndex, option) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: option }));
  };

  const handleExit = () => {
    if (!isSubmitted) setShowExitConfirm(true);
    else navigate('/dashboard');
  };

  const confirmExit = () => {
    setShowExitConfirm(false);
    handleSubmit(true);
  };

  const cancelExit = () => setShowExitConfirm(false);
  const closeReExamPopup = () => {
    setShowReExamPopup(false);
    navigate('/dashboard');
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${s % 60 < 10 ? '0' : ''}${s % 60}`;

  if (loading)
    return (
      <div className="loader-container">
        <p className="loader-text">Please Wait! Your Exam is Loading...</p>
        <div className="loader"></div>
      </div>
    );

  if (error) return <div className="error-message">{error}</div>;
  if (!exam) return <div className="error-message">Exam not found.</div>;

  return (
    <div className="exam-container container">
      <header className="exam-header sticky-header">
        <h1>
          {exam.title} ({exam.subject})
        </h1>
        <div className="exam-controls">
          <button onClick={() => handleSubmit(false)} className="submit-button" disabled={isSubmitted}>
            Submit Exam
          </button>
          <div className="timer">Time Left: {formatTime(timeLeft)}</div>
          <button onClick={handleExit} className="exit-button" disabled={isSubmitted}>
            Exit
          </button>
        </div>
      </header>

      <section className="questions-section">
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions..."
            className="search-input"
          />
        </div>

        {exam.questions
          .filter((q) => q.text.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((q, index) => (
            <div className="question-card" key={index}>
              <h2>
                {index + 1}. {q.text}
              </h2>
              <div className="options">
                {q.options.map((op, i) => (
                  <label key={i} className="option-label">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={op}
                      checked={answers[index] === op}
                      onChange={() => handleAnswerChange(index, op)}
                      disabled={isSubmitted}
                    />
                    {op}
                  </label>
                ))}
              </div>
            </div>
          ))}

        <button onClick={() => handleSubmit(false)} className="submit-button" disabled={isSubmitted}>
          Submit Exam
        </button>
      </section>

      {emailSentMessage && <div className="email-sent-message">{emailSentMessage}</div>}

      {showExitConfirm && (
        <div className="confirm-popup">
          <div className="confirm-popup-content">
            <h2>Confirm Exit</h2>
            <p>Exiting will submit your exam. Are you sure?</p>
            <div className="confirm-buttons">
              <button onClick={confirmExit} className="confirm-button">Yes</button>
              <button onClick={cancelExit} className="cancel-button">No</button>
            </div>
          </div>
        </div>
      )}

      {showReExamPopup && (
        <div className="confirm-popup">
          <div className="confirm-popup-content">
            <h2>Exam Already Taken</h2>
            <p>
              You have already taken this exam. Contact the admin —{' '}
              <a href="mailto:kumarvishal00021@gmail.com">kumarvishal00021@gmail.com</a>
            </p>
            <div className="confirm-buttons">
              <button onClick={closeReExamPopup} className="confirm-button">OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
