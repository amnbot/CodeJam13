import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
//import {TERipple} from 'tw-elements-react';
import Container from "react-bootstrap/Container";
import Grid from "@mui/material/Unstable_Grid2";
import {
  deleteExam,
  getAllExams,
  getExam,
  updateExamName,
} from "../utils/firestoreFunctions";
import CardSingle from "./CardSingle";
import { cardActionAreaClasses } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "rgb(30,41,59)", // Set your desired background color
  borderRadius: 8, // Add rounded corners
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Adjusted shadow for a subtle effect
  padding: 5, // Increased padding for better spacing,
  textAlign: "center", // Center content horizontally,\
};

export default function MyExams() {
  let { id } = useParams();
  const [exam, setExam] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  function editClick() {
    setDisabled(false);
  }

  function saveClick() {
    updateExamName(id, name);
    setDisabled(true);
  }
  const [modalQ, setModalQ] = useState("");
  const [modalA, setModalA] = useState("");
  function questionButton(data) {
    handleOpen();
    setModalQ(data.question);
    setModalA(data.answer);
  }
  useEffect(() => {
    getExam(id)
      .then((res) => setExam(res))
      .catch((err) => console.log(err));
  }, []);

  const [name, setName] = useState(exam ? exam.name : "");

  useEffect(() => {
    if (exam) console.log(exam);
  }, [exam]);

  if (exam) {
    return (
      <div>
        <div className="p-6 m-4 rounded-lg space-x-4 justify-between">
          {" "}
          <div className="inline-flex align-middle items-center justify-between">
            <label className="text-xl font-bold">Exam name: </label>
            <input
              style={{
                width: "50%",
                padding: "10px",
                fontSize: "24px",
                fontWeight: "bold",
                border: "none",
                borderBottom: "2px solid #333",
                outline: "none",
                margin: "10px 0",
                textAlign: "center",
                borderRadius: "10px",
              }}
              defaultValue={exam.name}
              disabled={disabled}
              onChange={(e) => setName(e.target.value)}
            ></input>{" "}
            <div className="space-x-4">
              <button className="bg-gray-800" onClick={editClick}>
                <EditIcon />
              </button>
              <button className="bg-gray-800" onClick={saveClick}>
                <SaveIcon />{" "}
              </button>
            </div>
          </div>
          <div className="space-x-4">
            <button
              className="bg-gray-800"
              onClick={() => navigate(`/exam/${id}`)}
            >
              <HistoryEduIcon />
            </button>

            <button
              className="bg-gray-800"
              onClick={() => navigate(`/my-exams`)}
            >
              <ArrowBackIcon />
            </button>

            <button
              className="bg-gray-800"
              onClick={() => {
                deleteExam(id);
                navigate(`/my-exams`);
              }}
            >
              {" "}
              <DeleteIcon />
            </button>
          </div>
        </div>
        <div className="p-6 m-4 rounded-lg space-y-4 space-x-4">
          <CardSingle
            title={"Grade Progression"}
            grades={exam.results}
            alwaysShow={true}
          ></CardSingle>
        </div>

        <div className="p-6 m-4 rounded-lg space-y-4">
          <h1 className="text-4xl font-bold" variant="h3">
            Flashcards
          </h1>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {exam.multipleChoice.map((questionData, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <button
                  className="px-8 py-4 text-base rounded-md focus:outline-none focus:shadow-outline bg-gris-cool"
                  onClick={() => questionButton(questionData)}
                >
                  {questionData.question}
                </button>
              </Grid>
            ))}
          </Grid>
        </div>

        <div className="p-6 m-4 rounded-lg space-y-4 space-x-4"></div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {modalQ}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {modalA}
            </Typography>
          </Box>
        </Modal>
      </div>
    );
  }
}
