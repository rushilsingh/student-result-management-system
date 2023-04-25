// CourseListPage.js
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

function CourseListPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    const apiUrl = "http://localhost:8000/course";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setLoading(false);
      });
  };

  const deleteCourse = (id) => {
    fetch(`http://localhost:8000/course/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          fetchCourses();
        } else {
          throw new Error("Failed to delete course");
        }
      })
      .catch((error) => {
        console.error("Error deleting course:", error);
      });
  };

  return (
    <div>
      <h1>Course List</h1>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course._id}>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>
                    <IconButton edge="end" aria-label="delete" onClick={() => deleteCourse(course._id)}>
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

export default CourseListPage;
