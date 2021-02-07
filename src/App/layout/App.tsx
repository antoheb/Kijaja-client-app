import React, { Fragment, useContext } from "react";
import { observer } from "mobx-react-lite";
import NavBar from "../../features/nav/NavBar";
import { Container } from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";
import { HomePage } from "../../features/home/HomePage";
import "semantic-ui-css/semantic.min.css";
import SignUpForm from "../../features/form/SignUpForm";
import SignInForm from "../../features/form/SignInForm";
import AppFooter from "../../features/footer/AppFooter";
import Account from "../../features/customer/Account";

const App: React.FC = () => {
  return (
    <Fragment>
      <Container fluid style={{ minHeigh: "100vh", marginBottom:'3em'}}>
        <NavBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signIn" component={SignInForm} />
          <Route path="/register" component={SignUpForm} />
          <Route path="/account" component={Account} />
        </Switch>
      </Container>
      <AppFooter />
    </Fragment>
  );
};

export default observer(App);
