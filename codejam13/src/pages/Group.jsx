import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import AlignItemsList from "../components/AlignListItem";
import Album from "../components/Album";
import { getExam } from "../utils/firestoreFunctions";
import { Container, Grid, Card } from "@mui/material";

export default function Group() {
  let { id } = useParams();

  const mockGroup = {
    name: "COMP 360",
    members: [
      { name: "Aymen", email: "yup" },
      { name: "Andrew", email: "yup1" },
      { name: "Pradyyy", email: "yup2" },
    ],
    exams: [
      { name: "Exam 1", id: "1", description: "This is a description" },
      { name: "Exam 2", id: "2", description: "This is a description" },
      { name: "Exam 3", id: "3", description: "This is a description" },
      { name: "Exam 1", id: "1", description: "This is a description" },
      { name: "Exam 2", id: "2", description: "This is a description" },
      { name: "Exam 3", id: "3", description: "This is a description" },
      { name: "Exam 1", id: "1", description: "This is a description" },
      { name: "Exam 2", id: "2", description: "This is a description" },
      { name: "Exam 3", id: "3", description: "This is a description" },
    ],
  };

  const [group, setGroup] = useState(mockGroup);

  useEffect(() => {
    // group call
  }, [group]);

  useEffect(() => {
    // group call
  }, []);
  if (group) {
    return (
      <div style={{ display: "block" }}>
        <h1 className="m-4">{group?.name ?? "COMP 360"}</h1>
        <div className="grid grid-cols-3">
          <div className="col-span-2">
            <Container sx={{ py: 8 }} maxWidth="md">
              <Grid container spacing={4}>
                {group.exams.map((exam) => (
                  <Album item={exam} />
                ))}
              </Grid>
            </Container>
          </div>
          <div className="col-span-1">
            <h1 style={{ marginBottom: "10px" }}>Members</h1>
            <AlignItemsList items={group.members} />
          </div>
        </div>
      </div>
    );
  }
}
