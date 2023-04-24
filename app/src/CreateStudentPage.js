// CreateStudentPage.js
import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

function CreateStudentPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const student = {
      first_name: firstName,
      last_name: lastName,
      email_address: email,
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
        Create Student
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
        <Button type="submit" variant="contained" color="primary">
          Create Student
        </Button>
      </form>
    </Box>
  );
}

export default CreateStudentPage;
