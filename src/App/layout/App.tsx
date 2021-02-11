import React, { Fragment, useContext, useEffect } from "react";
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
import VerifyEmail from "../../features/customer/VerifyEmail";
import AdsShowcase from "../../features/ads/AdsShowcase";
import AdsDetailsPage from "../../features/ads/AdsDetailsPage";
import AdsForm from "../../features/ads/AdsForm";
import { ModalContainer } from "../common/modal/modalContainer";
import { DeleteAlert } from "../../features/ads/DeleteAlert";

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
  }, [getUser, token, setAppLoaded]);

  return (
    <Fragment>
      <Container fluid style={{ minHeigh: "100vh", marginBottom: "3em" }}>
        <ModalContainer />
        <NavBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signIn" component={SignInForm} />
          <Route path="/register" component={SignUpForm} />
          <Route exact path="/user/account" component={Account} />
          <Route path="/user/registerSuccess" component={RegisterSuccess} />
          <Route path="/client/verifier-email" component={VerifyEmail} />
          <Route exact path="/ads" component={AdsShowcase} />
          <Route exact path="/ads/create" component={AdsForm} />
          <Route exact path="/ads/create/:id" component={AdsForm} />
          <Route exact path="/ads/details/:id" component={AdsDetailsPage} />
          <Route exact path={"/ads/delete/:id"} component={DeleteAlert} />
        </Switch>
      </Container>
      <AppFooter />
    </Fragment>
  );
};

export default observer(App);
