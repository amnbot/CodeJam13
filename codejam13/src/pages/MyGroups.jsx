import React from "react";
//import {TERipple} from 'tw-elements-react';
import Container from "react-bootstrap/Container";
import Grid from "@mui/material/Unstable_Grid2";

export default function MyGroups() {
  return (
    <div>
      MyGroups
      <div className="relative mb-4 flex w-full flex-wrap items-stretch">
        <input placeholder="Exam name..."></input>
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

        <button
          className="relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
          type="button"
          id="button-add"
        >
          +
        </button>
      </div>
      <div>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {Array.from(Array(6)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <p>Question {index}</p>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
