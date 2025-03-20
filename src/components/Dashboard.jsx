import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const examsSnapshot = await getDocs(collection(db, 'exams'));
        setExams(examsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        if (currentUser) {
          const resultsQuery = query(collection(db, 'results'), where('userId', '==', currentUser.uid));
          const resultsSnapshot = await getDocs(resultsQuery);
          setResults(resultsSnapshot.docs.map(doc => doc.data()));
        }
      } catch (error) {
        console.error('Dashboard fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard container">
      <header className="dashboard-header">
        <button onClick={handleBack} className="back-button">Back</button>
        <h1>Welcome, {currentUser?.displayName || currentUser?.email}</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>

      {currentUser?.email === 'kumarvishal00021@gmail.com' && (
        <Link to="/admin" className="admin-link">Manage Exams (Admin)</Link>
      )}
      
      <section className="exams-section">
        <h2>Available Exams</h2>
        <div className="exams-grid">
          {exams.length > 0 ? (
            exams.map(exam => (
              <Link key={exam.id} to={`/exam/${exam.id}`} className="exam-card">
                <h3>{exam.title}</h3>
                <p>{exam.description}</p>
                <span className="start-button">Start Exam</span>
              </Link>
            ))
          ) : (
            <p className="no-data">No exams available yet.</p>
          )}
        </div>
      </section>

      <section className="results-section">
        <h2>Your Results</h2>
        <div className="results-list">
          {results.length > 0 ? (
            results.map((result, index) => (
              <div key={index} className="result-item">
                <h3>{result.examTitle}</h3>
                <p>Score: {result.score}/{result.totalQuestions}</p>
                <small>{new Date(result.timestamp?.toDate()).toLocaleString()}</small>
              </div>
            ))
          ) : (
            <p className="no-data">No results yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}