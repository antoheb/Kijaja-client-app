import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import {
  Grid,
  Menu,
  Image,
  Search,
  Segment,
  Button,
  Dropdown,
} from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import { RootStoreContext } from "../../App/stores/RootStore";

const NavBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, isLoggedIn, logout } = rootStore.userStore;
  return (
    <Segment inverted>
      <Grid>
        <Grid.Row style={{ height: "120px" }}>
          <Grid.Column width={2}>
            <Image as={Link} to="/" src="/iconEshop.png" size="large" />
          </Grid.Column>
          <Grid.Column width={11}>
            <Search fluid style={{ marginTop: "3em" }} />
          </Grid.Column>
          <Grid.Column width={3} style={{ marginTop: "2em" }}>
            {user && isLoggedIn ? (
              <Menu.Item style={{float:'right', marginRight:'20px'}}>
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
        <Grid.Row>
          <Grid.Column>
            <Menu secondary inverted>
              <Menu.Item as={Link} to="/">
                Home
              </Menu.Item>
              <Menu.Item as={Link} to="/">
                Buy & Sell
              </Menu.Item>
              <Menu.Item as={Link} to="/">
                New Sale
              </Menu.Item>
            </Menu>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default observer(NavBar);
