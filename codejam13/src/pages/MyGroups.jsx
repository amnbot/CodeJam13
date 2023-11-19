import React from "react";
//import {TERipple} from 'tw-elements-react';
import { Container, Grid, Card } from "@mui/material";
import GroupTemplate from "../components/GroupTemplate";
import { useEffect } from "react";

export default function MyGroups() {
  const mockGroup = [
    {
      name: "COMP 360",
      descriptions: "This is a description",
      nbExams: 3,
      owner: "Aymen",
      id: "1",
    },
    {
      name: "COMP 206",
      descriptions: "This is a description",
      nbExams: 3,
      owner: "Andrew",
      id: "2",
    },
    {
      name: "COMP 360",
      descriptions: "This is a description",
      nbExams: 3,
      owner: "Aymen",
      id: "3",
    },
    {
      name: "COMP 206",
      descriptions: "This is a description",
      nbExams: 3,
      owner: "Andrew",
      id: "4",
    },
    {
      name: "COMP 360",
      descriptions: "This is a description",
      nbExams: 3,
      owner: "Aymen",
      id: "5",
    },
    {
      name: "COMP 206",
      descriptions: "This is a description",
      nbExams: 3,
      owner: "Andrew",
      id: "6",
    },
    {
      name: "COMP 360",
      descriptions: "This is a description",
      nbExams: 3,
      owner: "Aymen",
      id: "7",
    },
    {
      name: "COMP 206",
      descriptions: "This is a description",
      nbExams: 3,
      owner: "Andrew",
      id: "8",
    },
  ];
  useEffect(() => {
    // query groups of the current user
  }, []);

  const addGroup = () => {
    // pop model to add group
    return null;
  };

  const navigateToGroup = (group) => {
    // navigate to given group
    return null;
  };
  return (
    <div style={{ display: "block" }}>
      <h1 className="m-4">My Groups</h1>
      <div
        className="grid grid-cols-3"
        style={{
          marginTop: "40px",
        }}
      >
        <div className="col-span-2" style={{ padding: "20px" }}>
          <Container
            sx={{
              py: 8,
              boxShadow: "0 .125rem 1rem 0 rgba(25,25,25,.15)!important",
            }}
          >
            <Grid container spacing={8}>
              {mockGroup.map((group) => (
                <GroupTemplate key={group.id} item={group} />
              ))}
            </Grid>
          </Container>
        </div>
        <div className="col-span-1" style={{ padding: "20px" }}>
          <div
            style={{
              boxShadow: "0 .125rem 1rem 0 rgba(25,25,25,.15)",
              maxHeight: "70vh",
              display: "block",
            }}
          >
            <span
              style={{
                display: "grid",
                alignContent: "center",
                fontSize: "20px",
                height: "80px",
              }}
            >
              Recommandations
            </span>
            <Container
              sx={{
                py: 0,
              }}
            >
              <Grid container spacing={8}>
                {mockGroup.map((group) => (
                  <GroupTemplate key={group.id} item={group} />
                ))}
              </Grid>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}
