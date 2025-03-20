import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebaseConfig';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import '../styles/Result.css';

export default function Result() {
  const { examId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const examRef = doc(db, 'exams', examId);
        const examSnap = await getDoc(examRef);
        if (examSnap.exists()) {
          setExam({ id: examSnap.id, ...examSnap.data() });
        } else {
          setError('Exam not found');
          return;
        }

        const resultsQuery = query(
          collection(db, 'results'),
          where('userId', '==', currentUser.uid),
          where('examId', '==', examId)
        );
        const resultsSnap = await getDocs(resultsQuery);
        if (!resultsSnap.empty) {
          const latestResult = resultsSnap.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .sort((a, b) => b.timestamp.toDate() - a.timestamp.toDate())[0];
          setResult(latestResult);
        } else {
          setError('No result found for this exam');
        }
      } catch (err) {
        setError('Failed to load result: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [examId, currentUser]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) return <div className="loading">Loading result...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!exam || !result) return <div className="no-data">No result data available</div>;

  return (
    <div className="result-container container">
      <header className="result-header">
        <button onClick={handleBack} className="back-button">Back</button>
        <h1>Results for {exam.title}</h1>
        <p className="score">Your Score: {result.score} / {result.totalQuestions}</p>
      </header>
      <section className="result-details">
        <h2>Question Breakdown</h2>
        <ul className="result-list">
          {exam.questions.map((question, index) => {
            const userAnswer = result.answers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            return (
              <li key={index} className={isCorrect ? 'correct' : 'incorrect'}>
                <p><strong>Q: {question.text}</strong></p>
                <p>Your Answer: {userAnswer || 'Not answered'}</p>
                <p>Correct Answer: {question.correctAnswer}</p>
              </li>
            );
          })}
        </ul>
      </section>
      <Link to="/dashboard" className="dashboard-button">Back to Dashboard</Link>
    </div>
  );
}