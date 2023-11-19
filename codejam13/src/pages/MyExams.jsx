import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <input
            type="search"
            className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="Search exam..."
            aria-label="Search"
            aria-describedby="button-addon3"
          />

          {/* <!--Search button--> */}

          <button
            className="relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
            type="button"
            id="button-search"
          >
            Search
          </button>
          
        </div>

        <div>
          <CardSingle
            title={name}
            grades={exam.results}
            alwaysShow={true}
          ></CardSingle>
        </div>

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
