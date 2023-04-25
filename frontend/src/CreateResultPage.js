import React, { useState, useEffect } from "react";
import {
  Button,
  Paper,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

function CreateResultPage() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [student_id, setStudentId] = useState("");
  const [course_id, setCourseId] = useState("");
  const [grade, setGrade] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/student")
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error("Error fetching students:", error));

    fetch("http://localhost:8000/course")
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const apiUrl = "http://localhost:8000/result";

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ student_id, course_id, grade }),
    })
      .then((response) => {
        if (response.ok) {
          setStudentId("");
          setCourseId("");
          setGrade("");
        } else {
          throw new Error("Failed to create result");
        }
      })
      .catch((error) => {
        console.error("Error creating result:", error);
      });
  };

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Create Result
      </Typography>
      <Paper elevation={1} style={{ padding: "16px" }}>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="student">Student</InputLabel>
            <Select
              id="student"
              value={student_id}
              onChange={(event) => setStudentId(event.target.value)}
            >
              {students.map((student) => (
                <MenuItem key={student._id} value={student._id}>
                  {student.first_name} {student.last_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="course">Course</InputLabel>
            <Select
              id="course"
              value={course_id}
              onChange={(event) => setCourseId(event.target.value)}
            >
              {courses.map((course) => (
                <MenuItem key={course._id} value={course._id}>
                  {course.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="grade">Grade</InputLabel>
            <Select
              id="grade"
              value={grade}
              onChange={(event) => setGrade(event.target.value)}
            >
              {["A", "B", "C", "D", "E", "F"].map((gradeOption) => (
                <MenuItem key={gradeOption} value={gradeOption}>
                  {gradeOption}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Create Result
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default CreateResultPage;
