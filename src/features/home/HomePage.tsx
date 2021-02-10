import React from "react";
import { Container, Grid, Header, Segment } from "semantic-ui-react";

export const HomePage = () => {

  return (
    <Container fluid style={{ paddingLeft: "20px", paddingRight: "20px" }}>
      <Segment>
        <Header as={"h2"}>Home Page Gallery</Header>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>Items in sale here</Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  );
};
