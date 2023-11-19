import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  background: "rgb(30,41,59)",
  borderRadius: 8,
  maxHeight: '80vh',
  overflow: 'scroll'
};

export default function BasicModal({opened, setReviewing, wrongAnswers}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setReviewing(false);

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={opened}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className='font-bold text-xl text-center'>Your mistakes</h1>
          {wrongAnswers.map((wrongAnswer, index) => (
            <div className='my-4'>
              <h2 className='font-bold text-lg'>{wrongAnswer.questionNumber}. {wrongAnswer.question}</h2>
              <h3 className='font-bold text-lg text-red-400'>Your answer: {wrongAnswer.yourAnswer} ❌</h3>
              <h3 className='font-bold text-lg text-green-400'>Correct answer: {wrongAnswer.correctAnswer} ✅</h3>
            </div>
          ))}
        </Box>
      </Modal>
    </div>
  );
}
