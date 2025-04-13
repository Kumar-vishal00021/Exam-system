import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase/firebaseConfig';
import { collection, getDocs, getDoc,doc, query, where } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [results, setResults] = useState([]);
  const [allResults, setAllResults] = useState([]);
  const [topStudents, setTopStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = currentUser?.email === 'kumarvishal00021@gmail.com';

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return;

      try {
        // Fetch exams (available to all)
        const examsSnapshot = await getDocs(collection(db, 'exams'));
        setExams(examsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        if (isAdmin) {
          // Fetch all results for admin
          const allResultsSnapshot = await getDocs(collection(db, 'results'));
          const allResultsData = allResultsSnapshot.docs.map(doc => doc.data());

          // Fetch user names for all results
          const userIds = [...new Set(allResultsData.map(result => result.userId))];
          const usersSnapshot = await Promise.all(
            userIds.map(id => getDoc(doc(db, 'users', id)))
          );
          const users = Object.fromEntries(
            usersSnapshot.map(snap => [snap.id, snap.exists() ? snap.data().name : 'Anonymous'])
          );

          // Combine results with names and calculate percentages
          const enrichedResults = allResultsData.map(result => ({
            ...result,
            userName: users[result.userId] || 'Anonymous',
            percentage: (result.score / result.totalQuestions) * 100,
          }));
          setAllResults(enrichedResults);

          // Calculate top 3 students
          const sortedResults = enrichedResults
            .sort((a, b) => b.percentage - a.percentage || b.score - a.score)
            .slice(0, 3);
          setTopStudents(sortedResults);
        } else {
          // Fetch only user's results
          const resultsQuery = query(
            collection(db, 'results'),
            where('userId', '==', currentUser.uid)
          );
          const resultsSnapshot = await getDocs(resultsQuery);
          setResults(resultsSnapshot.docs.map(doc => ({
            ...doc.data(),
            percentage: (doc.data().score / doc.data().totalQuestions) * 100,
          })));
        }
      } catch (error) {
        console.error('Dashboard fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentUser, isAdmin]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard container">
      <header className="dashboard-header">
        <button onClick={handleBack} className="back-button">Back</button>
        <h1>Welcome, {currentUser?.displayName || currentUser?.email}</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>

      {isAdmin && <Link to="/admin" className="admin-link">Manage Exams (Admin)</Link>}

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

      {isAdmin ? (
        <>
          <section className="top-students-section">
            <h2>Top 3 Students</h2>
            <div className="top-students-list">
              {topStudents.length > 0 ? (
                topStudents.map((student, index) => (
                  <div key={index} className="top-student-item">
                    <h3>{index + 1}. {student.userName}</h3>
                    <p>Exam: {student.examTitle}</p>
                    <p>Score: {student.score}/{student.totalQuestions} ({student.percentage.toFixed(2)}%)</p>
                  </div>
                ))
              ) : (
                <p className="no-data">No results yet.</p>
              )}
            </div>
          </section>

          <section className="all-results-section">
            <h2>All Students' Results</h2>
            <div className="results-list">
              {allResults.length > 0 ? (
                allResults.map((result, index) => (
                  <div key={index} className="result-item">
                    <h3>{result.userName}</h3>
                    <p>Exam: {result.examTitle}</p>
                    <p>Score: {result.score}/{result.totalQuestions} ({result.percentage.toFixed(2)}%)</p>
                    <small>{new Date(result.timestamp?.toDate()).toLocaleString()}</small>
                  </div>
                ))
              ) : (
                <p className="no-data">No results yet.</p>
              )}
            </div>
          </section>
        </>
      ) : (
        <section className="results-section">
          <h2>Your Results</h2>
          <div className="results-list">
            {results.length > 0 ? (
              results.map((result, index) => (
                <div key={index} className="result-item">
                  <h3>{result.examTitle}</h3>
                  <p>Score: {result.score}/{result.totalQuestions} ({result.percentage.toFixed(2)}%)</p>
                  <small>{new Date(result.timestamp?.toDate()).toLocaleString()}</small>
                </div>
              ))
            ) : (
              <p className="no-data">No results yet.</p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}