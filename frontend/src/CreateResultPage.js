import React, { useState, useEffect } from "react";
import {
  Button,
  Paper,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogContent,
  FormHelperText
} from "@mui/material";
import CustomAlert from "./CustomAlert";

function CreateResultPage() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [student_id, setStudentId] = useState("");
  const [course_id, setCourseId] = useState("");
  const [grade, setGrade] = useState("");
  const [studentError, setStudentError] = useState(false);
  const [courseError, setCourseError] = useState(false);
  const [gradeError, setGradeError] = useState(false);

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

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

    // Validate form fields
    if (!student_id) {
      setStudentError(true);
    }
    if (!course_id) {
      setCourseError(true);
    }
    if (!grade) {
      setGradeError(true);
    }

    if (!student_id || !course_id || !grade) {
      showAlert("Please fill out all fields", "error");
      return;
    }
    const apiUrl = "http://localhost:8000/result";

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ student_id, course_id, grade }),
    })
      .then(async (response) => {
        if (response.ok) {
          setStudentId("");
          setCourseId("");
          setGrade("");
          showAlert("Result created successfully", "success");
        } else {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
      })
      .catch((error) => {
        console.error("Error creating result:", error);
        showAlert(error.message, "error");
      });
  };

  const showAlert = (message, severity) => {
    setAlert({ open: true, message, severity });
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Create Result
      </Typography>
      <Paper elevation={1} style={{ padding: "16px" }}>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal" error={studentError}>
            <InputLabel htmlFor="student">Student</InputLabel>
            <Select
              id="student"
              value={student_id}
              onChange={(event) => {
                setStudentId(event.target.value);
                setStudentError(false);
              }}
            >
              {students.map((student) => (
                <MenuItem key={student._id} value={student._id}>
                  {student.first_name} {student.last_name}
                </MenuItem>
              ))}
            </Select>
            {studentError && (
              <FormHelperText error>Please select a student</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth margin="normal" error={courseError}>
            <InputLabel htmlFor="course">Course</InputLabel>
            <Select
              id="course"
              value={course_id}
              onChange={(event) => {
                setCourseId(event.target.value);
                setCourseError(false);
              }}
            >
              {courses.map((course) => (
                <MenuItem key={course._id} value={course._id}>
                  {course.name}
                </MenuItem>
              ))}
            </Select>
            {courseError && (
              <FormHelperText error>Please select a course</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth margin="normal" error={gradeError}>
            <InputLabel htmlFor="grade">Grade</InputLabel>
            <Select
              id="grade"
              value={grade}
              onChange={(event) => {
                setGrade(event.target.value);
                setGradeError(false);
              }}
            >
              {["A", "B", "C", "D", "E", "F"].map((gradeOption) => (
                <MenuItem key={gradeOption} value={gradeOption}>
                  {gradeOption}
                </MenuItem>
              ))}
            </Select>
            {gradeError && (
              <FormHelperText error>Please select a grade</FormHelperText>
            )}
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Create Result
          </Button>
        </form>
      </Paper>
      <Dialog open={alert.open} onClose={handleCloseAlert}>
        <DialogContent>
          <CustomAlert
            onClose={handleCloseAlert}
            severity={alert.severity}
            sx={{ width: "100%" }}
          >
            {alert.message}
          </CustomAlert>
        </DialogContent>
      </Dialog>
    </div>
  );
   
}

export default CreateResultPage;
