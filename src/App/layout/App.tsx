import React, { Fragment, useContext, useEffect, useState } from "react";
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
import { RootStoreContext } from "../stores/RootStore";
import RegisterSuccess from "../../features/customer/RegisterSuccess";
import VerifyEmail from '../../features/customer/VerifyEmail';

const App: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { getUser } = rootStore.userStore;
  const { token, setAppLoaded } = rootStore.commonStore;

  useEffect(() => {
    if (token) {
      getUser().then(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getUser, token]);

  return (
    <Fragment>
      <Container fluid style={{ minHeigh: "100vh", marginBottom: "3em" }}>
        <NavBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signIn" component={SignInForm} />
          <Route path="/register" component={SignUpForm} />
          <Route path="/user/account" component={Account} />
          <Route path="/user/registerSuccess" component={RegisterSuccess} />
          <Route path="/client/verifier-email" component={VerifyEmail} />
        </Switch>
      </Container>
      <AppFooter />
    </Fragment>
  );
};

export default observer(App);
