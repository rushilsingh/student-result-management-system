// CreateCoursePage.js
import React, { useState } from "react";
import { Button, TextField, Paper, Typography } from "@mui/material";

function CreateCoursePage() {
  const [name, setName] = useState("");

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
        } else {
          throw new Error("Failed to create course");
        }
      })
      .catch((error) => {
        console.error("Error creating course:", error);
      });
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
      </div>
    );
  }
  
  export default CreateCoursePage;
  
