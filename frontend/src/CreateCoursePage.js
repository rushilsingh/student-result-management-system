import React, { useState } from "react";
import {
  Button,
  TextField,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  FormHelperText,
} from "@mui/material";
import CustomAlert from "./CustomAlert";

function CreateCoursePage() {
  const [name, setName] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [nameError, setNameError] = useState(false);

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name) {
      setNameError(true);
      return;
    }
    const apiUrl = "http://localhost:8000/course";

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
      .then(async (response) => {
        if (response.ok) {
          setName("");
          setAlertSeverity("success");
          setAlertMessage("Course created successfully");
          setAlertOpen(true);
        } else {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
      })
      .catch((error) => {
        console.error("Error creating course:", error);
        setAlertSeverity("error");
        setAlertMessage(error.message);
        setAlertOpen(true);
      });
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameError(false);
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
            onChange={handleNameChange}
            required
            name="courseName"
            error={nameError}
          />
          {nameError && (
            <FormHelperText error>Please enter a course name</FormHelperText>
          )}
          <Button type="submit" variant="contained" color="primary">
            Create Course
          </Button>
        </form>
      </Paper>
      <Dialog
        open={alertOpen}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Notification"}</DialogTitle>
        <DialogContent>
          <CustomAlert
            onClose={handleCloseAlert}
            severity={alertSeverity}
            sx={{ width: "100%" }}
          >
            {alertMessage}
          </CustomAlert>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateCoursePage;
