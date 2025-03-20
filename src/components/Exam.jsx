import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebaseConfig';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import '../styles/Exam.css';

export default function Exam() {
  const { examId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const examRef = doc(db, 'exams', examId);
        const examSnap = await getDoc(examRef);
        if (examSnap.exists()) {
          setExam({ id: examSnap.id, ...examSnap.data() });
        } else {
          setError('Exam not found');
        }
      } catch (err) {
        setError('Failed to load exam: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchExam();
  }, [examId]);

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: answer }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const score = exam.questions.reduce((total, q, index) => {
        return total + (answers[index] === q.correctAnswer ? 1 : 0);
      }, 0);

      const resultData = {
        userId: currentUser.uid,
        examId: examId,
        examTitle: exam.title,
        score: score,
        totalQuestions: exam.questions.length,
        answers: answers,
        timestamp: new Date(),
      };

      await addDoc(collection(db, 'results'), resultData);
      navigate(`/result/${examId}`);
    } catch (err) {
      setError('Failed to submit exam: ' + err.message);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) return <div className="loading">Loading exam...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!exam) return <div className="no-data">No exam data available</div>;

  return (
    <div className="exam-container container">
      <header className="exam-header">
        <button onClick={handleBack} className="back-button">Back</button>
        <h1>{exam.title}</h1>
        <p>{exam.description}</p>
      </header>
      <form onSubmit={handleSubmit} className="exam-form">
        {exam.questions && Array.isArray(exam.questions) ? (
          <div className="questions">
            {exam.questions.map((question, index) => (
              <div key={index} className="question-card">
                <h3>{index + 1}. {question.text}</h3>
                {question.options && Array.isArray(question.options) ? (
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
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <p className="no-data">No options available</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="no-data">No questions available</p>
        )}
        <button type="submit" className="submit-button" disabled={Object.keys(answers).length === 0}>
          Submit Exam
        </button>
      </form>
    </div>
  );
}