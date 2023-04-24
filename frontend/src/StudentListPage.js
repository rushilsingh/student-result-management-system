// StudentListPage.js
import React, { useState, useEffect } from "react";
import { CircularProgress, List, ListItem, ListItemText, IconButton, ListItemSecondaryAction } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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
        <List>
          {students.map((student) => (
            <ListItem key={student._id}>
              <ListItemText primary={`${student.first_name} ${student.last_name}`} secondary={student.email_address} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => deleteStudent(student._id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}

export default StudentListPage;
