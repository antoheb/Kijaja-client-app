import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Grid, Header, Form, Button, Segment } from "semantic-ui-react";
import { Field, Form as FinalForm } from "react-final-form";
import { TextInputIcon } from "../../App/common/form/TextInputIcon";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../App/stores/RootStore";
import { FORM_ERROR } from "final-form";
import { IUserFormValues } from "../../App/models/user";
import { ErrorMessage } from "./ErrorMessage";

const SignInForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.userStore;

  return (
    <Grid centered style={{ marginTop: "80px", marginBottom: "80px" }}>
      <Grid.Column width={8}>
        <Segment>
          <Header as="h1">SIGN IN</Header>
          <br />
          <FinalForm
            onSubmit={(values: IUserFormValues) =>
              login(values).catch((error) => ({ [FORM_ERROR]: error }))
            }
            render={({
              handleSubmit,
              invalid,
              pristine,
              submitError,
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
                {submitError && !dirtySinceLastSubmit && (
                  <ErrorMessage error={submitError} />
                )}
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
                  disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                  float="left"
                  basic
                  color="yellow"
                  type="submit"
                  content="LOG IN"
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(SignInForm);
