// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./HomePage";
import CreateStudentPage from "./CreateStudentPage";
import StudentListPage from "./StudentListPage";
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="left-navigation">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create-student">Create Student</Link>
            </li>
            <li>
              <Link to="/student-list">Student List</Link>
            </li>
          </ul>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create-student" element={<CreateStudentPage />} />
            <Route path="/student-list" element={<StudentListPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
