import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import AlignItemsList from "../components/AlignListItem";
import Album from "../components/Album";
import { getExam, getGroup } from "../utils/firestoreFunctions";
import { Container, IconButton, Grid, Card } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { getUsersByIds } from "../utils/firestoreFunctions";

export default function Group() {
  let { id } = useParams();

  const [group, setGroup] = useState(null);
  const [exam, setExam] = useState([]);
  const [members, setMembers] = useState([]);

  const addExam = (exam) => {
    // add exam to group
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (group) {
      getUsersByIds(group.members).then((res) => {
        setMembers(res);
      });
      const list = [];
      for (const id in group.exams) {
        getExam(group.exams[id]).then((res) => {
          list.push(res);
          setExam(list);
        });
      }
    }
  }, [group]);

  useEffect(() => {
    console.log(members);
  }, [members]);

  useEffect(() => {
    console.log(exam);
  }, [exam]);

  useEffect(() => {
    getGroup(id).then((res) => {
      setGroup(res);
    });
  }, []);

  if (group) {
    return (
      <div style={{ display: "block" }}>
        <h1 className="m-4">{group?.name ?? "COMP 360"}</h1>
        <div className="grid grid-cols-3">
          <div className="col-span-2">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h1 style={{ marginBottom: "10px", marginRight: "30px" }}>
                Exams
              </h1>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => navigate("/create-exam")}
              >
                <AddIcon />
              </IconButton>
            </div>

            <Container sx={{ py: 8 }} maxWidth="md">
              <Grid container spacing={4}>
                {exam?.map((exam, index) => (
                  <Album key={index} item={exam} />
                )) ?? <div>loading... </div>}
              </Grid>
            </Container>
          </div>
          <div className="col-span-1">
            <h1 style={{ marginBottom: "10px" }}>Members</h1>
            <AlignItemsList key={0} items={members ?? null} />
          </div>
        </div>
      </div>
    );
  }
}
