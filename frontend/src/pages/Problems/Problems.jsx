import React, { useState, useEffect } from 'react';
import { FiFilter } from 'react-icons/fi';
import axios from 'axios';
import './Problems.css';

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/questions');
        // Transform the data to match our table structure
        const transformedData = response.data.map(problem => ({
          id: problem._id,
          title: problem.title,
          acceptance: "0%", // You can add this field to your backend if needed
          difficulty: problem.difficulty || "Easy", // Default to Easy if not specified
          isPremium: problem.isPremium || false,
          status: problem.status || null,
          description: problem.description // Keep this if you need it for details page
        }));
        setProblems(transformedData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching problems:', err);
        setError('Failed to load problems. Please try again later.');
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  if (loading) {
    return (
      <div className="problems-container">
        <div className="loading-spinner">Loading problems...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="problems-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="problems-container">
      <div className="problems-header">
        <h1>Problem List</h1>
        <div className="header-buttons">
          <button className="lists-btn">Lists</button>
          <button className="premium-btn">Premium</button>
        </div>
      </div>

      <div className="problems-filters">
        <div className="filter-group">
          <button className="filter-btn">
            <FiFilter />
            Filter
          </button>
          <select className="difficulty-select">
            <option value="">Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <select className="status-select">
            <option value="">Status</option>
            <option value="todo">Todo</option>
            <option value="solved">Solved</option>
            <option value="attempted">Attempted</option>
          </select>
        </div>
        <div className="search-group">
          <input type="text" placeholder="Search questions..." />
        </div>
      </div>

      <div className="problems-table">
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>Title</th>
              <th>Acceptance</th>
              <th>Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem) => (
              <tr key={problem.id}>
                <td className="status-cell">
                  {problem.status === "Solved" && <span className="status-solved">✓</span>}
                  {problem.status === "Attempted" && <span className="status-attempted">●</span>}
                </td>
                <td className="title-cell">
                  <a href={`/problems/${problem.id}`}>
                    {problem.title}
                    {problem.isPremium && <span className="premium-icon">🔒</span>}
                  </a>
                </td>
                <td>{problem.acceptance}</td>
                <td>
                  <span className={`difficulty-tag ${problem.difficulty.toLowerCase()}`}>
                    {problem.difficulty}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Problems; 