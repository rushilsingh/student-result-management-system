// StudentListPage.js
import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function StudentListPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    const apiUrl = "http://localhost:8000/student";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
        setLoading(false);
      });
  };

  const deleteStudent = (id) => {
    fetch(`http://localhost:8000/student/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          fetchStudents();
        } else {
          throw new Error("Failed to delete student");
        }
      })
      .catch((error) => {
        console.error("Error deleting student:", error);
      });
  };

  return (
    <div>
      <h1>Student List</h1>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>{`${student.first_name} ${student.last_name}`}</TableCell>
                  <TableCell>{student.email_address}</TableCell>
                  <TableCell>{student.date_of_birth}</TableCell>
                  <TableCell>
                    <IconButton edge="end" aria-label="delete" onClick={() => deleteStudent(student._id)}>
                      <CloseIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default StudentListPage;
