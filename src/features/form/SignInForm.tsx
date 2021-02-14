import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Grid, Header, Form, Button, Segment, List } from "semantic-ui-react";
import { Field, Form as FinalForm } from "react-final-form";
import { TextInputIcon } from "../../App/common/form/TextInputIcon";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../App/stores/RootStore";
import { FORM_ERROR } from "final-form";
import { IUserFormValues } from "../../App/models/user";
import { ErrorMessage } from "./ErrorMessage";
import {
  combineValidators,
  composeValidators,
  isRequired,
  matchesPattern,
} from "revalidate";
import ReCAPTCHA from "react-google-recaptcha";

const SignInForm = () => {
  const validate = combineValidators({
    username: composeValidators(
      isRequired({ message: "Address courriel est obligatoire" }),
      matchesPattern(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )({ message: "Address courriel n'est pas valid" })
    )(),
    password: isRequired({ message: "Le mot de passe est obligatoire" }),
  });
  const rootStore = useContext(RootStoreContext);
  const { login, verifyCaptcha, user, isLoggedIn } = rootStore.userStore;
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const {openModal} = rootStore.modalStore

  if (user && isLoggedIn)
    return (
      <Grid centered style={{ marginTop: "80px", marginBottom: "80px" }}>
        <Grid.Column width={8}>
          <Segment>
            <Header as="h1" textAlign="center">
              YOU'RE ALREADY SIGN IN
            </Header>
            <List style={{ marginTop: "7%", textAlign:"center" }}>
              <List.Item style={{ marginBottom: "3%" }}>
                <Button
                  content="My Account!"
                  color="yellow"
                  as={NavLink}
                  to="/user/account"
                />
              </List.Item>
              <List.Item>
                <Button
                  content="Post new ad!"
                  color="instagram"
                  as={NavLink}
                  to="/ads/create"
                />
              </List.Item>
            </List>
          </Segment>
        </Grid.Column>
      </Grid>
    );

  return (
    <Grid centered style={{ marginTop: "80px", marginBottom: "80px" }}>
      <Grid.Column width={8}>
        <Segment>
          <Header as="h1">SIGN IN</Header>
          <Header size="small" color="violet">
            Sign In to Post an Add
          </Header>
          <FinalForm
            validate={validate}
            onSubmit={(values: IUserFormValues) => {
              if (captchaValue)
                verifyCaptcha(captchaValue).then((success) => {
                  if (success)
                    login(values).catch((error) => (openModal(<ErrorMessage error={error} />)));
                  else alert("Captcha could not be verified");
                });
            }}
            render={({
              handleSubmit,
              invalid,
              pristine,
              dirtySinceLastSubmit,
            }) => (
              <Form onSubmit={handleSubmit} error>
                <Field
                  placeholder="fido@dogmail.com"
                  name="username"
                  icon="mail"
                  component={TextInputIcon}
                />
                <Field
                  placeholder="Password"
                  name="password"
                  icon="lock"
                  type="password"
                  component={TextInputIcon}
                />
                <br />
                <Button
                  floated="left"
                  basic
                  color="black"
                  content="SIGN UP"
                  as={Link}
                  to={"/register"}
                />
                <Button
                  disabled={
                    (invalid && !dirtySinceLastSubmit) ||
                    pristine ||
                    !captchaValue
                  }
                  float="left"
                  basic
                  color="yellow"
                  type="submit"
                  content="LOG IN"
                />
              </Form>
            )}
          />
          <br />
          <ReCAPTCHA
            sitekey="6LcJUk0aAAAAAHGjxbF1chIihCAj4I5IU1bsLniP"
            onChange={(value) => {
              setCaptchaValue(value);
            }}
            size="normal"
            type="image"
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(SignInForm);
