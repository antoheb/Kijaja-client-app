import { FORM_ERROR } from "final-form";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Field, Form as FinalForm } from "react-final-form";
import { Link } from "react-router-dom";
import { Grid, Header, Form, Button, Segment, Icon } from "semantic-ui-react";
import { TextInput } from "../../App/common/form/TextInput";
import { TextInputIcon } from "../../App/common/form/TextInputIcon";
import { IUserFormValues } from "../../App/models/user";
import { RootStoreContext } from "../../App/stores/RootStore";
import { ErrorMessage } from "./ErrorMessage";

const SignUpForm: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { register, passwordError } = rootStore.userStore;

  return (
    <Grid>
      <Grid.Row style={{ marginTop: "2em", marginBottom: "2em" }}>
        <Grid.Column width={2}></Grid.Column>
        <Grid.Column width={8}>
          <Segment padded>
            <Header as="h1" style={{ marginBottom: "1em" }}>
              Register
            </Header>
            <FinalForm
              onSubmit={(values: IUserFormValues) =>
                register(values).catch((error) => ({ [FORM_ERROR]: error }))
              }
              render={({
                handleSubmit,
                invalid,
                submitError,
                pristine,
                dirtySinceLastSubmit,
              }) => (
                <Form onSubmit={handleSubmit} error>
                  <Field
                    placeholder="First Name"
                    name="firstName"
                    component={TextInput}
                  />
                  <Field
                    placeholder="Last Name"
                    name="lastName"
                    component={TextInput}
                  />
                  <Field
                    placeholder="Email"
                    name="email"
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
                  <Field
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    icon="lock"
                    type="password"
                    component={TextInputIcon}
                  />
                  {submitError && !dirtySinceLastSubmit && (
                    <ErrorMessage error={submitError} />
                  )}
                  {passwordError && !dirtySinceLastSubmit && (
                    <ErrorMessage
                      error={submitError}
                      text={passwordError}
                    ></ErrorMessage>
                  )}
                  <Button
                    disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                    float="left"
                    basic
                    color="yellow"
                    type="submit"
                    content="REGISTER"
                  />
                </Form>
              )}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column width={5}>
          <Segment style={{ textAlign: "center" }} padded>
            <Header as={"h5"}>Already Registered?</Header>
            <p>Sign in to post your ad.</p>
            <Button
              as={Link}
              to={"/signIn"}
              content={"Sign In"}
              color="yellow"
            />
          </Segment>
          <Segment padded>
            <Header as={"h5"} style={{ textAlign: "center", marginTop: "8px" }}>
              Why Register?
            </Header>
            <p>
              To enhance your experience and help you stay safe and secure, you
              now need to register to:
            </p>
            <Icon name="check" /> Post, edit and manage ads <br /> <br />
            <Icon name="check" /> Access saved ads in your Favourites from all
            of your devices <br /> <br />
            <Icon name="check" /> Reserve your own nickname
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default observer(SignUpForm);
