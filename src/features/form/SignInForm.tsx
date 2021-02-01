import React from "react";
import { Link } from "react-router-dom";
import { Grid, Header, Form, Button, Segment } from "semantic-ui-react";
import { Field, Form as FinalForm } from "react-final-form";
import { TextInputIcon } from "../../App/common/form/TextInputIcon";
import { observer } from "mobx-react-lite";
import Agent from "../../App/api/Agent";

const SignInForm = () => {
  const handleSubmit = (values: any) => {
    Agent.test.helloworld();
  };

  return (
    <Grid centered style={{ marginTop: "120px", marginBottom:'120px' }}>
      <Grid.Column width={8}>
        <Segment>
          <Header as="h1">SIGN IN</Header>
          <br />
          <FinalForm
            onSubmit={(values) => handleSubmit(values)}
            render={({ handleSubmit }) => (
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
