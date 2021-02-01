import React from "react";
import { observer } from "mobx-react-lite";
import {
  Grid,
  Menu,
  Image,
  Search,
  Segment,
  Button,
} from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <Segment inverted>
      <Grid>
        <Grid.Row style={{height:'120px'}}>
          <Grid.Column width={2}>
            <Image as={Link} to="/" src="/iconEshop.png" size='large'/>
          </Grid.Column>
          <Grid.Column width={11}>
            <Search fluid style={{ marginTop: "3em" }} />
          </Grid.Column>
          <Grid.Column width={3} style={{ marginTop: "2em" }}>
            <p>
              <NavLink to="/register">Register</NavLink> or{" "}
              <NavLink to="/signIn">Sign In</NavLink>
              <Button inverted basic color="yellow" icon="user" style={{ marginLeft: "10px" }} as={Link} to="/account"></Button>
            </p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Menu secondary inverted>
              <Menu.Item as={Link} to="/">Home</Menu.Item>
              <Menu.Item as={Link} to="/">Buy & Sell</Menu.Item>
              <Menu.Item as={Link} to="/">New Sale</Menu.Item>
            </Menu>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default observer(NavBar);
