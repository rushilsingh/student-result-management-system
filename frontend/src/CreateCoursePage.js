// CreateCoursePage.js
import React, { useState } from "react";
import {
  Button,
  TextField,
  Paper,
  Typography,
  Snackbar,
} from "@mui/material";
import Alert from "@mui/material/Alert";

function CreateCoursePage() {
  const [name, setName] = useState("");
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const apiUrl = "http://localhost:8000/course";

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
      .then((response) => {
        if (response.ok) {
          setName("");
          showNotification("Course created successfully", "success");
        } else {
          throw new Error("Failed to create course");
        }
      })
      .catch((error) => {
        console.error("Error creating course:", error);
        showNotification("Failed to create course", "error");
      });
  };

  const showNotification = (message, severity) => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotification({ ...notification, open: false });
  };

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Create Course
      </Typography>
      <Paper elevation={1} style={{ padding: "16px" }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Course Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            Create Course
          </Button>
        </form>
      </Paper>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CreateCoursePage;
