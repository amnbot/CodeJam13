import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import CreateExam from "./pages/CreateExam";
import Exam from "./pages/Exam";
import PrivateRoute from "./services/PrivateRoute";
import SignIn from "./components/SignIn";
import MyExams from "./pages/MyExams"

function App() {
  const [count, setCount] = useState(0);
  

  return (
    <div className="">
      <Router>
      <Header />
      <Sidebar />
        <Routes>
          <Route path="/login" element={<SignIn />} exact/>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} exact/>
            <Route path="/create-exam" element={<CreateExam exact/>} /> 
            <Route path="/my-exams" element={<MyExams />} exact/>
          </Route>
        </Routes>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
