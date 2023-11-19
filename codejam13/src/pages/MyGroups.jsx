import React from "react";
//import {TERipple} from 'tw-elements-react';
import { Container, Grid, Card } from "@mui/material";
import GroupTemplate from "../components/GroupTemplate";
import { useEffect } from "react";
import RecommandationGroup from "../components/RecommandationGroup";
import {
  createGroup,
  getGroup,
  getFirstNGroupsWithId,
} from "../utils/firestoreFunctions";
import { useState } from "react";
import { getCurrentUser } from "../services/AuthContext";

export default function MyGroups() {
  const [group, setGroup] = useState([]);
  const [recommandations, setRecommandations] = useState([]);

  //   const group = {
  //     name: "COMP 206",
  //     descriptions: "Software Systems",
  //     owner: "4EeC4MJxi9dbAdajaHEY",
  //     exams: [],
  //   };
  //   const group2 = {
  //     name: "COMP 360",
  //     descriptions: "Algorithm Design",
  //     owner: "ihSswhYYEZEitut5gWj9",
  //     exams: [],
  //   };

  useEffect(() => {
    getCurrentUser().then((user) => {
      const list = [];
      for (var index in user.groups) {
        getGroup(user.groups[index]).then((group) => {
          console.log(group);
          list.push(group);
          setGroup(list);
        });
      }
    });
    getFirstNGroupsWithId(6).then((res) => {
      setRecommandations(res);
    });
  }, []);

  useEffect(() => {
    // query groups of the current user
    console.log(group);
  }, [group]);

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
              {group.map((group) => (
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
              <Grid container spacing={4}>
                {recommandations.map((group) => (
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
