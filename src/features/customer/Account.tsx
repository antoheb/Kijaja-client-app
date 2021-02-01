import React from "react";
import { Grid, Button, Card, Image, Icon, Header } from "semantic-ui-react";

const Account: React.FC = () => {
  return (
    <Grid style={{ marginLeft: "2%" }}>
      <Grid.Row>
        <Grid.Column width={4}>
          <Card color="yellow">
            <Image src="unnamed.png" circular centered />
            <Card.Content>
              <Card.Header>Antoine Hebert</Card.Header>
              <Card.Description>
                <Icon name="edit" />
                <a href="/">Edit profile</a>
              </Card.Description>
            </Card.Content>
          </Card>
          <Button.Group basic color="yellow" vertical fluid>
            <Button>My Ads</Button>
            <Button>My Messages</Button>
          </Button.Group>
        </Grid.Column>
        <Grid.Column
          width={12}
          style={{ textAlign: "center", marginTop: "15%" }}
        >
          <Header as={"h2"}>You have no active ads at the moment.</Header>
          <Header as={"h4"}>
            Why not <a href="/">post and ad</a> now?
          </Header>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Account;
