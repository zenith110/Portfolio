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
import { v4 as uuidv4 } from 'uuid';

function CreateArticle() {
  const [title, setTitleName] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ]);
  const createArticleClient = gql`
    mutation($newArticle: CreateArticleInfo){
    createArticle(input: $newArticle){
      uuid
     }
    }
  `;
  
  const [createArticle, { data, loading, error }] = useMutation(createArticleClient);
  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;
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
                  <div className="text-data">
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
                    <label>
                      <input
                        style={{ textAlign: "" }}
                        type="text"
                        id="description"
                        name="description"
                        placeholder="description"
                        onChange={(event) => setDescription(event.target.value)}
                      />
                    </label>
                    <SlateEditor value={value} setValue={setValue} />
                    <button
                      style={{ textAlign: "center" }}
                      onClick={(e) => {
                        e.preventDefault();
                        /*TODO: Modify author to include authed author*/
                        let newArticleData = {  
                              title: title,
                              author: "Abrahan",
                              contentData: HTMLSerializer(value[0]),
                              dateWritten: date,
                              url: process.env.REACT_APP_DOMAIN + title.toLowerCase().replace(" ", "-"),
                              description: description,
                              uuid: uuidv4()
                            }
                        createArticle({
                          variables: {
                            newArticle: newArticleData
                          },
                        });
                      }}
                    >
                      Submit Data
                    </button>
                  </div>
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
