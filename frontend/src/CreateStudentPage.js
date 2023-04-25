// CreateStudentPage.js
import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Dialog,
  DialogContent
} from "@mui/material";
import CustomAlert from "./CustomAlert";

function CreateStudentPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const student = {
      first_name: firstName,
      last_name: lastName,
      email_address: email,
      date_of_birth: dob,
    };

    fetch("http://localhost:8000/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    })
      .then((response) => {
        if (response.ok) {
          setAlert({ open: true, message: "Student created", severity: "success" });
          setFirstName("");
          setLastName("");
          setEmail("");
          setDob("");
        } else {
          throw new Error("Failed to create student");
        }
      })
      .catch((error) => {
        setAlert({ open: true, message: "Error creating student", severity: "error" });
        console.error("Error creating student:", error);
      });
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const validateAge = () => {
    const currentDate = new Date();
    const dobDate = new Date(dob);
    var age = currentDate.getFullYear() - dobDate.getFullYear();
    const m = currentDate.getMonth() - dobDate.getMonth();
    if (m < 0 || (m === 0 && currentDate.getDate() < dobDate.getDate())) {
      age--;
    }
    return age >= 10;
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Box>
      <Typography variant="h4" mb={2}>
        Add New Students
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          error={!validateEmail() && email.length > 0}
          helperText={!validateEmail() && email.length > 0 ? "Invalid email" : ""}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Date of Birth"
          type="date"
          variant="outlined"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          fullWidth
          required
          error={!validateAge() && dob.length > 0}
          helperText={!validateAge() && dob.length > 0 ? "Student must be at least 10 years old" : ""}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!validateAge() || !validateEmail()}
        >
          Add New Student
        </Button>
        </form>
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
    </Box>
  );
}

export default CreateStudentPage;