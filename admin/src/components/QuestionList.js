import React, { useEffect, useState } from "react";
import axios from "axios";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/questions");
        setQuestions(response.data);
      } catch (err) {
        setError("Failed to fetch questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Questions</h2>
      <ul>
        {questions.map((q, index) => (
          <li key={index}>
            <strong>Title:</strong> {q.title} <br />
            <strong>Description:</strong> {q.description} <br />
            <strong>Test Cases:</strong> {q.testCases.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList; 