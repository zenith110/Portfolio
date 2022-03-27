/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Import React dependencies.
import React, { useState } from "react";

import ReactDOMServer from "react-dom/server";
// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import { gql, useMutation } from "@apollo/client";
import SlateEditor from "./components/slate-editor";
import HTMLSerializer from "./components/html-serializer";

function CreateArticle() {
  const [title, setTitleName] = useState("");
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ]);
  const createArticleClient = gql`
    mutation($title: String!, $author: String!, $contentData: String!, $dateWritten: String!, $url: String!){
    createArticle(title: $title, author: $author, contentData: $contentData, dateWritten: $dateWritten, url: $url){
      title
    }
}
  `;
  
  const [createArticle, { data, loading, error }] = useMutation(createArticleClient);
  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;
  //   if (error) return (window.location.href = "https://status.abrahannevarez.dev");
  const currentDate = new Date();
  let date = currentDate.toISOString()
  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={3}>
                <Grid item xs={12} xl={6}>
                  <label>
                    <input
                      style={{ textAlign: "" }}
                      type="text"
                      id="title"
                      name="title"
                      placeholder="title"
                      onChange={(event) => setTitleName(event.target.value)}
                    />
                  </label>
                  <SlateEditor value={value} setValue={setValue} />
                  <button
                    style={{ textAlign: "center" }}
                    onClick={(e) => {
                      e.preventDefault();
                      createArticle({
                        variables: {
                          title: title,
                          author: "Abrahan",
                          contentData: HTMLSerializer(value[0]),
                          dateWritten: date,
                          url: process.env.REACT_APP_DOMAIN + title.toLowerCase().replace(" ", "-"),
                        },
                      });
                    }}
                  >
                    Submit Data
                  </button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}
export default CreateArticle;
