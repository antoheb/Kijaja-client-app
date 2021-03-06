import { FORM_ERROR } from "final-form";
import React, { useContext, useEffect, useState } from "react";
import { Field, Form as FinalForm } from "react-final-form";
import { combineValidators, isRequired } from "revalidate";
import {
  Button,
  Container,
  Form,
  Grid,
  Header,
  Segment,
} from "semantic-ui-react";
import { TextInput } from "../../App/common/form/TextInput";
import { TextInputIcon } from "../../App/common/form/TextInputIcon";
import { IUser, UserFormValues } from "../../App/models/user";
import { RootStoreContext } from "../../App/stores/RootStore";
import { ErrorMessage } from "./ErrorMessage";

export const EditProfile: React.FC = () => {
  const validate = combineValidators({
    firstName: isRequired({ message: "First name is required" }),
    lastName: isRequired({ message: "Last name is required" }),
  });

  const rootStore = useContext(RootStoreContext);
  const { loadUser, editProfile } = rootStore.userStore;
  const { token } = rootStore.commonStore;
  const [user, setUser] = useState(new UserFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (token) {
      loadUser()
        .then((user) => setUser(new UserFormValues(user)))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [loadUser, setLoading, token]);

  return (
    <Container
      fluid
      style={{ marginTop: "50px", marginBottom: "50px", width: "400px" }}
    >
      <Header as="h3" textAlign="center">
        EDIT YOUR PROFILE
      </Header>
      <Segment clearing style={{ marginBottom: "5em" }}>
        <FinalForm
          validate={validate}
          initialValues={user}
          onSubmit={(values: IUser) =>
            editProfile(values).catch((error) => ({ [FORM_ERROR]: error }))
          }
          render={({
            handleSubmit,
            invalid,
            submitError,
            pristine,
            dirtySinceLastSubmit,
          }) => (
            <Form loading={loading} onSubmit={handleSubmit} error>
              <Field
                placeholder="First Name"
                name="firstName"
                component={TextInput}
              />
              <Field placeholder="Last Name" name="lastName" component={TextInput} />
              <Field
                placeholder="Phone Number"
                name="phoneNumber"
                icon="phone"
                component={TextInputIcon}
              />
              {submitError && !dirtySinceLastSubmit && (
                <ErrorMessage error={submitError} />
              )}
              <Grid stackable>
                <Grid.Row>
                  <Grid.Column>
                    <Button
                      disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                      fluid
                      color="yellow"
                      type="submit"
                      content="MODIFY"
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          )}
        />
      </Segment>
    </Container>
  );
};
