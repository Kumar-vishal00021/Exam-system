import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebaseConfig';
import { collection, query, where, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import '../styles/AdminExamResults.css';

export default function AdminExamResults() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Fetch exam details
        const examDoc = await getDoc(doc(db, 'exams', examId));
        if (examDoc.exists()) {
          setExam(examDoc.data());
        }

        // Fetch results for this exam
        const resultsQuery = query(collection(db, 'results'), where('examId', '==', examId));
        const resultsSnapshot = await getDocs(resultsQuery);
        const resultsData = resultsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Fetch user names
        const userIds = [...new Set(resultsData.map(result => result.userId))];
        const usersSnapshot = await Promise.all(
          userIds.map(id => getDoc(doc(db, 'users', id)))
        );
        const users = Object.fromEntries(
          usersSnapshot.map(snap => [snap.id, snap.exists() ? snap.data().name : 'Anonymous'])
        );

        // Calculate stats (students per date with full details)
        const statsByDate = resultsData.reduce((acc, result) => {
          const date = new Date(result.timestamp?.toDate()).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
          if (!acc[date]) {
            acc[date] = {
              count: 0,
              subject: result.subject,
              students: [],
            };
          }
          acc[date].count += 1;
          acc[date].students.push({
            id: result.id,
            userId: result.userId,
            userName: users[result.userId] || 'Anonymous',
            score: result.score,
            totalQuestions: result.totalQuestions,
            percentage: (result.score / result.totalQuestions) * 100,
            timestamp: result.timestamp,
            reExamAllowed: result.reExamAllowed || false,
          });
          return acc;
        }, {});
        setStats(statsByDate);
      } catch (error) {
        console.error('Error fetching results:', error);
        alert('Failed to load results: ' + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [examId]);

  const allowReExam = async (resultId, date) => {
    try {
      await updateDoc(doc(db, 'results', resultId), { reExamAllowed: true });
      setStats(prev => ({
        ...prev,
        [date]: {
          ...prev[date],
          students: prev[date].students.map(student =>
            student.id === resultId ? { ...student, reExamAllowed: true } : student
          ),
        },
      }));
      alert('Re-exam allowed for this student.');
    } catch (error) {
      console.error('Error allowing re-exam:', error);
      alert('Failed to allow re-exam: ' + error.message);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (!exam) return <div className="error-message">Exam not found.</div>;

  return (
    <div className="admin-exam-results-container container">
      <header className="results-header">
        <button onClick={handleBack} className="back-button">Back</button>
        <h1>Student Results for {exam.title} ({exam.subject})</h1>
      </header>

      <section className="stats-section">
        <h2>Exam Participation by Date</h2>
        <div className="stats-list">
          {Object.entries(stats).length > 0 ? (
            Object.entries(stats)
              .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
              .map(([date, { count, subject, students }], index) => (
                <div key={index} className="stats-card">
                  <h3>
                    {date} ({count} {count === 1 ? 'student' : 'students'} attended)
                  </h3>
                  <p>Subject: {subject}</p>
                  <div className="students-list">
                    <h4>Student Results:</h4>
                    {students.length > 0 ? (
                      <div className="results-grid">
                        {students.map((student, idx) => (
                          <div key={idx} className="result-card">
                            <h3>{student.userName}</h3>
                            <p>
                              Score: {student.score}/{student.totalQuestions} (
                              {student.percentage.toFixed(2)}%)
                            </p>
                            <p>Date: {new Date(student.timestamp?.toDate()).toLocaleString()}</p>
                            <div className="result-actions">
                              <Link
                                to={`/result/${examId}/${student.userId}`}
                                className="view-report-button"
                              >
                                View Report
                              </Link>
                              {!student.reExamAllowed && (
                                <button
                                  onClick={() => allowReExam(student.id, date)}
                                  className="re-exam-button"
                                >
                                  Allow Re-Exam
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="no-data">No students attended.</p>
                    )}
                  </div>
                </div>
              ))
          ) : (
            <p className="no-data">No participation data available.</p>
          )}
        </div>
      </section>
    </div>
  );
}