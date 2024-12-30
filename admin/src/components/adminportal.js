import React, { useState } from "react";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

const AdminPortal = () => {
  const [questions, setQuestions] = useState([]);

  const handleAddQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  return (
    <div>
      <h1>Admin Portal</h1>
      <QuestionForm onAddQuestion={handleAddQuestion} />
      <h2>Added Questions</h2>
      <ul>
        {questions.map((q, index) => (
          <li key={index}>
            <strong>Title:</strong> {q.title} <br />
            <strong>Description:</strong> {q.description} <br />
            <strong>Test Cases:</strong> {q.testCases.join(", ")}
          </li>
        ))}
      </ul>
      <QuestionList />
    </div>
  );
};

export default AdminPortal;
