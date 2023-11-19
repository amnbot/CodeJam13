import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
//import {TERipple} from 'tw-elements-react';
import Container from "react-bootstrap/Container";
import Grid from "@mui/material/Unstable_Grid2";
import {
  getAllExams,
  getExam,
  updateExamName,
} from "../utils/firestoreFunctions";
import CardSingle from "./CardSingle";
import { cardActionAreaClasses } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function MyExams() {
  let { id } = useParams();
  const [exam, setExam] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  

  const navigate = useNavigate();
  
  function editClick(){
    setDisabled(false);
  }

  function saveClick() {
    updateExamName(id, name);
    setDisabled(true);
  }
  const [modalQ, setModalQ] = useState("");
  const [modalA, setModalA] = useState("");
  function questionButton(data){
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
        <div>
          <input
            defaultValue={exam.name}
            disabled={disabled}
            onChange={(e) => setName(e.target.value)}
          ></input>{" "}
          <button onClick={editClick}>Edit name</button>
          <button onClick={saveClick}>Save </button>
        </div>
        <div>
          <CardSingle
            title={"Grade Progression"}
            grades={exam.results}
            alwaysShow={true}
          ></CardSingle>
        </div>
        <Typography variant="h3">Flashcards</Typography>
        <div>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {exam.multipleChoice.map((questionData, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <button onClick={() => questionButton(questionData)}>{questionData.question}</button>
              </Grid>
            ))}
          </Grid>
        </div>

        <div>
        <Button onClick={() => navigate(`/exam/${id}`)} variant="contained" size="large">
          Attempt Exam
        </Button>
        </div>

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
