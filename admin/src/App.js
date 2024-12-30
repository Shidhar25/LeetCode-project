import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminPortal from "./components/adminportal";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminPortal />} />
      </Routes>
    </Router>
  );
}

export default App;
