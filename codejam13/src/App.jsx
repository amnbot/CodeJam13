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
import MyExams from "./pages/MyExams";
import { Navigate } from "react-router";
import CardGrid from "./pages/CardGrid";
import MyGroups from "./pages/MyGroups";
import Group from "./pages/Group";
import Community from "./pages/Community";
import UserExams from "./pages/UserExams";

function App() {
  const [count, setCount] = useState(0);
  const cardData = [
    { tilte: "Aymen" },
    { title: "Asfsd" },
    { title: "Fsdfsdfds" },
    { title: "sffasada" },
  ];

  return (
    <div className="">
      <Router>
        <Header />
        <Sidebar />
        <Routes>
          <Route path="/login" element={<SignIn />} exact />
          <Route path="/create-exam" element={<CreateExam />} exact />
          <Route exact path="/exam/:id" element={<Exam />} />
          <Route exact path="/my-exams/:id" element={<MyExams />} />
          <Route exact path="/my-exams" element={<UserExams />} />
          <Route path="/my-groups" element={<MyGroups />} exact />
          <Route exact path="/group/:id" element={<Group />} />
          <Route exact path="/my-group/:id" element={<MyGroups />} />
          <Route
            exact
            path="/my-groups"
            element={<CardGrid cards={cardData} />}
          />
          <Route exact path="/community" element={<Community />} />
          <Route path="/" element={<Dashboard />} exact />
          <Route path="*" element={<Navigate to="/" />} />
          {/* <Route element={<PrivateRoute />}>
            
          </Route> */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
