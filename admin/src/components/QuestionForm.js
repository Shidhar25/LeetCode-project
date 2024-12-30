import React, { useState } from "react";
import axios from "axios";

const QuestionForm = ({ onAddQuestion }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    testCases: [""]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/questions', formData);
      onAddQuestion(response.data);
      // Reset form
      setFormData({
        title: "",
        description: "",
        testCases: [""]
      });
    } catch (error) {
      console.error("Error adding question:", error);
      alert("Failed to add question. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTestCaseChange = (index, value) => {
    const newTestCases = [...formData.testCases];
    newTestCases[index] = value;
    setFormData({
      ...formData,
      testCases: newTestCases
    });
  };

  const addTestCase = () => {
    setFormData({
      ...formData,
      testCases: [...formData.testCases, ""]
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Test Cases:</label>
        {formData.testCases.map((testCase, index) => (
          <input
            key={index}
            type="text"
            value={testCase}
            onChange={(e) => handleTestCaseChange(index, e.target.value)}
          />
        ))}
        <button type="button" onClick={addTestCase}>
          Add Test Case
        </button>
      </div>
      <button type="submit">Add Question</button>
    </form>
  );
};

export default QuestionForm;
