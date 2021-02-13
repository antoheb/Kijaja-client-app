import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import {
  Grid,
  Menu,
  Segment,
  Button,
  Dropdown,
  Header,
  Image,
} from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import { RootStoreContext } from "../../App/stores/RootStore";

const NavBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, isLoggedIn, logout } = rootStore.userStore;
  return (
    <Segment inverted>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Menu secondary inverted>
              <Menu.Item as={Link} to="/">
                Home
              </Menu.Item>
              <Menu.Item as={Link} to="/ads">
                Buy & Sell
              </Menu.Item>
              <Menu.Item as={Link} to="/ads">
                New Sale
              </Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column textAlign="right">
            {user && isLoggedIn ? (
              <Menu.Item style={{ float: "right", marginRight: "20px" }}>
                <Button
                  inverted
                  basic
                  color="yellow"
                  icon="user"
                  style={{ marginLeft: "10px" }}
                  as={Link}
                  to="/user/account"
                ></Button>
                <Dropdown pointing="top right">
                  <Dropdown.Menu>
                    <Dropdown.Item
                      style={{ position: "left" }}
                      onClick={logout}
                      text="Se Deconnecter"
                    />
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
            ) : (
              <p>
                <NavLink to="/register">Register</NavLink> or{" "}
                <NavLink to="/signIn">Sign In</NavLink>
              </p>
            )}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          {" "}
          <Image href="/" src="../../kijaja.png" size="small" />
        </Grid.Row>
        <Grid.Row centered>
          <Header
            as="h2"
            content="The Goto place for selling your used stuff!"
            inverted
            textAlign="center"
            style={{
              fontWeight: "normal",
            }}
          />
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default observer(NavBar);
