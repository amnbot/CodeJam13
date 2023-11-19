import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const Album = (value) => {
  const exam = value.item;

  if (!exam) {
    return;
  }

  const navigate = useNavigate();

  const goToExam = (id) => {
    // navigate to given group
    navigate(`/exam/${id}`);
  };
  return (
    <Grid item key={exam.id} xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="div"
          sx={{
            // 16:9
            pt: "56.25%",
          }}
          image="https://source.unsplash.com/random?wallpapers"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {exam.name}
          </Typography>
          <Typography>{exam.description}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => goToExam(exam.id)}>
            Try
          </Button>
          <Button size="small">View</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
export default Album;
