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

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="">
      <Router>
      <Header />
      <Sidebar />
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/create-exam" element={<CreateExam />} /> 
          <Route exact path="/exercise" element={<Exam />} /> 
        </Routes>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
