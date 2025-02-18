import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Homepage from './pages/Homepage';
import Choose from './pages/choose';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AddSclassPage from './pages/admin/AddSclassPage'; 
import StudentPage from './pages/admin/StudentPage'
import SubjectPage from './pages/admin/SubjectPage'
import TeacherPage from './pages/admin/TeacherPage'
import NoticePage from './pages/admin/NoticePage'
import ResultForm from './pages/admin/ResultForm';
import ViewComplain from './pages/admin/ViewComplain';
import StudentLogin from './pages/student/StudentLogin';
import StudentDashboard from './pages/student/StudentDashboard';
import TeacherLogin from './pages/teacher/TeacherLogin';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import StudentProfile from './pages/student/StudentProfile';
import ViewNotice from './pages/student/ViewNotice';
import ComplainPage from './pages/student/ComplainPage';
import Result from './pages/student/Result';
import ViewComplainT from './pages/teacher/ViewComplainT';
import ViewNoticeT from './pages/teacher/ViewNoticeT';
import TeacherPageT from './pages/teacher/TeacherPageT';
import StudentPageT from './pages/teacher/StudentPageT';
import TeacherPageS from './pages/student/TeacherPageS';
import StudentEvaluation from './pages/teacher/StudentEvaluation';
import Home from './pages/Home';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/choose" element={<Choose />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/admin/AdminLogin" element={<AdminLogin />} />
        <Route path="/admin/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/admin/AdminDashboard/AddSclassPage" element={<AddSclassPage />} />
        <Route path="/admin/AdminDashboard/StudentPage" element={<StudentPage />} />
        <Route path="/admin/AdminDashboard/TeacherPage" element={<TeacherPage />} />
        <Route path="/admin/AdminDashboard/SubjectPage" element={<SubjectPage />} />
        <Route path="/admin/AdminDashboard/NoticePage" element={<NoticePage />} />
        <Route path="/admin/AdminDashboard/ResultForm" element={<ResultForm />} />
        <Route path="/admin/AdminDashboard/ViewComplain" element={<ViewComplain />} />

        <Route path="/student/StudentLogin" element={<StudentLogin />} />
        <Route path="/student/StudentDashboard/:rollNum" element={<StudentDashboard />} />
        <Route path="/student/profile/:rollNum" element={<StudentProfile />} />
        <Route path="/student/Result/:rollNum" element={<Result />} />
        <Route path="/student/ViewNotice" element={<ViewNotice />} />
        <Route path="/student/ComplainPage" element={<ComplainPage />} />
        <Route path="/student/TeacherPageS" element={<TeacherPageS />} />

        <Route path="/teacher/TeacherLogin" element={<TeacherLogin />} />
        <Route path="/teacher/TeacherDashboard/:email" element={<TeacherDashboard />} />
        <Route path="/teacher/TeacherDashboard/StudentPageT" element={<StudentPageT />} />
        <Route path="/teacher/TeacherDashboard/TeacherPageT" element={<TeacherPageT />} />
        <Route path="/teacher/TeacherDashboard/ViewComplainT" element={<ViewComplainT />} />
        <Route path="/teacher/TeacherDashboard/ViewNoticeT" element={<ViewNoticeT />} />
        <Route path="/teacher/TeacherDashboard/StudentEvaluation" element={<StudentEvaluation />} />
        
      </Routes>
    </Router>
  );
}

export default App;
