// CreateStudentPage.js
import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

function CreateStudentPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");

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
      .then((response) => response.json())
      .then((data) => {
        console.log("Student created:", data);
      })
      .catch((error) => {
        console.error("Error creating student:", error);
      });
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
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
        Add New Student
        </Button>
      </form>
    </Box>
  );
}

export default CreateStudentPage;
