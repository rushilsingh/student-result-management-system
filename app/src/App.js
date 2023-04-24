// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./HomePage";
import CreateStudentPage from "./CreateStudentPage";
import StudentListPage from "./StudentListPage";
import { Button, Box, Container, Drawer, List, ListItem } from "@mui/material";
import { styled } from "@mui/system";
import styles from "./App.module.css";

const NavLink = styled(Button)(({ theme }) => ({
  textDecoration: "none",
  color: "inherit"
}));

function App() {
  return (
    <Router>
      <Box className={styles.appContainer}>
        <Box display="flex">
          <Drawer
            variant="permanent"
            anchor="left"
            sx={{
              width: 240,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: 240,
                boxSizing: "border-box"
              }
            }}
          >
            <List>
              <ListItem button component={Link} to="/">
                <NavLink>Home</NavLink>
              </ListItem>
              <ListItem button component={Link} to="/create-student">
                <NavLink>Create Student</NavLink>
              </ListItem>
              <ListItem button component={Link} to="/student-list">
                <NavLink>Student List</NavLink>
              </ListItem>
            </List>
          </Drawer>
          <Container maxWidth="md" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/create-student" element={<CreateStudentPage />} />
              <Route path="/student-list" element={<StudentListPage />} />
            </Routes>
          </Container>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
