import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import '../styles/Exam.css';

export default function Exam() {
  const { examId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const examDoc = await getDoc(doc(db, 'exams', examId));
        if (examDoc.exists()) {
          setExam({ id: examDoc.id, ...examDoc.data() });
          setAnswers(new Array(examDoc.data().questions.length).fill(null));
          setTimeLeft(examDoc.data().duration * 60);
        }
      } catch (error) {
        console.error('Error fetching exam:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchExam();
  }, [examId]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          submitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = 'Leaving will submit your exam. Are you sure?';
    };

    const handlePopState = () => {
      submitExam();
      navigate('/dashboard');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [answers, exam, currentUser, examId, navigate]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < exam.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitExam = async () => {
    try {
      let score = 0;
      exam.questions.forEach((q, index) => {
        if (answers[index] === q.correctAnswer) score++;
      });

      const result = {
        userId: currentUser.uid,
        examId: exam.id,
        examTitle: exam.title,
        subject: exam.subject,
        score,
        totalQuestions: exam.questions.length,
        answers,
        timestamp: new Date(),
      };

      await setDoc(doc(db, 'results', `${currentUser.uid}_${examId}`), result);
      navigate(`/result/${examId}`);
    } catch (error) {
      console.error('Error submitting exam:', error);
      alert('Failed to submit exam: ' + error.message);
    }
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (!exam) return <div className="error-message">Exam not found.</div>;

  return (
    <div className="exam-container container">
      <header className="exam-header">
        <h1>{exam.title} ({exam.subject})</h1>
        <div className="exam-info">
          <p>Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
          <p>Question {currentQuestion + 1} of {exam.questions.length}</p>
        </div>
      </header>
      <section className="question-section">
        <h2>Question {currentQuestion + 1}</h2>
        <p>{exam.questions[currentQuestion].text}</p>
        <div className="options">
          {exam.questions[currentQuestion].options.map((option, index) => (
            <label key={index} className="option">
              <input
                type="radio"
                name="answer"
                value={option}
                checked={answers[currentQuestion] === option}
                onChange={() => handleAnswer(option)}
              />
              {option}
            </label>
          ))}
        </div>
      </section>
      <div className="navigation">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="nav-button"
        >
          Previous
        </button>
        {currentQuestion < exam.questions.length - 1 ? (
          <button onClick={handleNext} className="nav-button">
            Next
          </button>
        ) : (
          <button onClick={submitExam} className="submit-button">
            Submit Exam
          </button>
        )}
      </div>
    </div>
  );
}