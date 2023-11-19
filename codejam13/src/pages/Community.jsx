import React from "react";
//import {TERipple} from 'tw-elements-react';
import { Container, Grid, Card } from "@mui/material";
import GroupTemplate from "../components/GroupTemplate";
import { useEffect } from "react";
import RecommandationGroup from "../components/RecommandationGroup";
import { createGroup, getGroup } from "../utils/firestoreFunctions";
import { useState } from "react";
import { getCurrentUser } from "../services/AuthContext";
import { async } from "@firebase/util";
import {
  getFirstNGroupsWithId,
  getFirstNExamsWithId,
} from "../utils/firestoreFunctions";

export default function Community() {
  const [groups, setGroups] = useState([]);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    getFirstNGroupsWithId(6).then((res) => {
      setGroups(res);
    });
    getFirstNExamsWithId(6).then((res) => {
      setExams(res);
    });
  }, []);

  useEffect(() => {
    // query groups of the current user
    console.log(groups);
  }, [groups]);

  useEffect(() => {
    // query groups of the current user
    console.log(exams);
  }, [exams]);

  return (
    <div style={{ display: "block" }}>
      <h1 className="m-4">Community Hub</h1>
      <div
        className="grid grid-cols-2"
        style={{
          marginTop: "40px",
        }}
      >
        <div
          className="col-span-1"
          style={{
            padding: "20px",
          }}
        >
          <div
            style={{
              boxShadow: "0rem .125rem 1rem 0rem rgba(25,25,25,.15)",
              borderRadius: "8px",
            }}
          >
            <h1 style={{ marginBottom: "20px", paddingTop: "20px" }}>Groups</h1>
            <Container
              sx={{
                py: 6,
                maxHeight: "70vh",
                display: "block",
              }}
            >
              <Grid container spacing={4}>
                {groups.map((group) => (
                  <RecommandationGroup key={group.id} item={group} />
                ))}
              </Grid>
            </Container>
          </div>
        </div>
        <div className="col-span-1" style={{ padding: "20px" }}>
          <div
            style={{
              boxShadow: "0rem .125rem 1rem 0rem rgba(25,25,25,.15)",
              borderRadius: "8px",
            }}
          >
            <h1 style={{ marginBottom: "20px", paddingTop: "20px" }}>Exams</h1>
            <Container
              sx={{
                py: 6,
                maxHeight: "70vh",
                display: "block",
              }}
            >
              <Grid container spacing={4}>
                {exams.map((group) => (
                  <RecommandationGroup key={group.id} item={group} />
                ))}
              </Grid>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}
