// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./HomePage";
import CreateStudentPage from "./CreateStudentPage";
import StudentListPage from "./StudentListPage";
import CreateCoursePage from "./CreateCoursePage";
import CourseListPage from "./CourseListPage";
import ResultListPage from "./ResultListPage"
import CreateResultPage from "./CreateResultPage";
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
                <NavLink>Add New Student</NavLink>
              </ListItem>
              <ListItem button component={Link} to="/student-list">
                <NavLink>Student List</NavLink>
              </ListItem>
              <ListItem button component={Link} to="/create-course">
                <NavLink>Add New Course</NavLink>
              </ListItem>
              <ListItem button component={Link} to="/course-list">
                <NavLink>Course List</NavLink>
              </ListItem>
              <ListItem button component={Link} to="/create-result">
                <NavLink>Add New Result</NavLink>
              </ListItem>
              <ListItem button component={Link} to="/result-list">
                <NavLink>Result List</NavLink>
              </ListItem>

            </List>
          </Drawer>
          <Container maxWidth="md" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/create-student" element={<CreateStudentPage />} />
              <Route path="/student-list" element={<StudentListPage />} />
              <Route path="/create-course" element={<CreateCoursePage />} />
              <Route path="/course-list" element={<CourseListPage />} />
              <Route path="/create-result" element={<CreateResultPage />} />
              <Route path="/result-list" element={<ResultListPage />} />
            </Routes>
          </Container>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
