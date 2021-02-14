import React from "react";
import { Link } from "react-router-dom";
import { Segment, Grid, Header, List } from "semantic-ui-react";

const AppFooter: React.FC = () => {
  return (
    <Segment inverted style={{height:"230px"}}>
      <Grid divided inverted stackable padded>
        <Grid.Row columns={3}>
          <Grid.Column>
            <Header inverted as="h4" content="ONLINE SALES" />
            <List link inverted>
              <List.Item as={Link} to={"/"}>
                Home
              </List.Item>
              <List.Item as={Link} to={"/ads"}>
                Buy & Sell
              </List.Item>
              <List.Item as={Link} to={"/ads/create"}>
                Post Ad
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column>
            <Header inverted as="h4" content="INFO" />
            <List link inverted>
              <List.Item as={Link} to={"/"}>
                Contact
              </List.Item>
              <List.Item as={Link} to={"/"}>
                Terms of Use
              </List.Item>
              <List.Item as={Link} to={"/"}>
                Privacy Policy
              </List.Item>
              <List.Item as={Link} to={"/"}>
                Posting Policy
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column>
            <Header as="h4" inverted>
              ACCOUNT
            </Header>
            <List link inverted>
              <List.Item as={Link} to={"/register"}>
                Register
              </List.Item>
              <List.Item as={Link} to={"/signIn"}>
                Sign In
              </List.Item>
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default AppFooter;
