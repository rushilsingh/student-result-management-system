import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function ResultListPage() {
  const [results, setResults] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:8000/result")
      .then((response) => response.json())
      .then((data) => setResults(data))
      .catch((error) => console.error("Error fetching results:", error));

    fetch("http://localhost:8000/student")
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error("Error fetching students:", error));

    fetch("http://localhost:8000/course")
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching courses:", error));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/result/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          fetchData();
        } else {
          throw new Error("Failed to delete result");
        }
      })
      .catch((error) => {
        console.error("Error deleting result:", error);
      });
  };

  const findStudentName = (studentId) => {
    const student = students.find((student) => student._id === studentId);
    return student ? `${student.first_name} ${student.last_name}` : "";
  };

  const findCourseName = (courseId) => {
    const course = courses.find((course) => course._id === courseId);
    return course ? course.name : "";
  };

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Results
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Course Name</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((result) => (
              <TableRow key={result._id}>
                <TableCell>{findStudentName(result.student_id)}</TableCell>
                <TableCell>{findCourseName(result.course_id)}</TableCell>
                <TableCell>{result.grade}</TableCell>
                <TableCell>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(result._id)}
                  >
                    <CloseIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ResultListPage;
