import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { addMember } from "../utils/firestoreFunctions";
import { getCurrentUser } from "../services/AuthContext";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const RecommandationGroup = (value) => {
  const group = value.item;

  const navigate = useNavigate();

  const join = (id) => {
    // join the group
    navigateToGroup(id);
  };

  const navigateToGroup = (id) => {
    console.log("navigateToGroup");
    // navigate to given group
    getCurrentUser().then((user) => {
      addMember(id, user.id).then((res) => {
        navigate(`/group/${id}`);
      });
    });
  };
  return (
    <Grid item key={group.id} sm={6}>
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
            {group.name}
          </Typography>
          <Typography>{group.description}</Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => join(group.id)} size="small">
            Join
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
export default RecommandationGroup;
