import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebaseConfig';
import { doc, getDoc, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import '../styles/Exam.css';

export default function Exam() {
  const { examId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [canTakeExam, setCanTakeExam] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const checkEligibilityAndLoadExam = async () => {
      try {
        const resultQuery = query(
          collection(db, 'results'),
          where('userId', '==', currentUser.uid),
          where('examId', '==', examId)
        );
        const resultSnapshot = await getDocs(resultQuery);
        if (!resultSnapshot.empty) {
          const result = resultSnapshot.docs[0].data();
          if (!result.reExamAllowed) {
            setCanTakeExam(false);
            setLoading(false);
            return;
          }
        }

        const examDoc = await getDoc(doc(db, 'exams', examId));
        if (examDoc.exists()) {
          const examData = examDoc.data();
          setExam({ id: examDoc.id, ...examData });
          setTimeLeft(examData.questions.length * 60);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    checkEligibilityAndLoadExam();
  }, [examId, currentUser]);

  const startExam = () => {
    alert(`Exam started! You have ${exam.questions.length} minutes to complete.`);
    setIsStarted(true);
  };

  useEffect(() => {
    if (isStarted && timeLeft > 0 && canTakeExam) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isStarted, timeLeft, canTakeExam]);

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: answer }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    clearInterval(timerRef.current);
    try {
      const score = exam.questions.reduce((total, q, index) => {
        return total + (answers[index] === q.correctAnswer ? 1 : 0);
      }, 0);

      await addDoc(collection(db, 'results'), {
        userId: currentUser.uid,
        examId: examId,
        examTitle: exam.title,
        subject: exam.subject,
        score,
        totalQuestions: exam.questions.length,
        answers,
        timestamp: new Date(),
        reExamAllowed: false,
      });
      navigate(`/result/${examId}`);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (!canTakeExam) return <div className="error-message">You cannot retake this exam.</div>;
  if (!exam) return <div className="error-message">Exam not found.</div>;

  return (
    <div className="exam-container container">
      <header className="exam-header">
        <h1>{exam.title} ({exam.subject})</h1>
        {isStarted && <div className="timer">Time Left: {formatTime(timeLeft)}</div>}
      </header>
      {!isStarted ? (
        <button className="start-button" onClick={startExam}>
          Start Exam
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="exam-form">
          {exam.questions.map((q, index) => (
            <div key={index} className="question-card">
              <h3>{q.text}</h3>
              <div className="options">
                {q.options.map((option, optIndex) => (
                  <label key={optIndex} className="option-label">
                    <input
                      type="radio"
                      name={`q-${index}`}
                      value={option}
                      checked={answers[index] === option}
                      onChange={() => handleAnswerChange(index, option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button type="submit" className="submit-button">
            Submit Exam
          </button>
        </form>
      )}
    </div>
  );
}