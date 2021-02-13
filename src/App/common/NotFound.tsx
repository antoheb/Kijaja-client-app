import React from "react";
import { Grid, Segment, Header } from "semantic-ui-react";

export const NotFound = () => {
  return (
    <Grid centered style={{ marginBottom: "5em", marginTop: "5em" }}>
      <Segment
        textAlign="center"
        style={{ width: "500px", paddingBottom: "5em", paddingTop: "3em" }}
      >
        <Header as={"h1"}>Page not found</Header>
        <Header as={"h3"}>
          Sorry, we were not able to found the page you were looking for{" "}
        </Header>
        <br />
        <p>
          Go Back to <a href="/">Home</a> or go browse{" "}
          <a href="/ads">Ads.</a>
        </p>
      </Segment>
    </Grid>
  );
};
