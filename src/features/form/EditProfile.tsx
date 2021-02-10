import { FORM_ERROR } from "final-form";
import React, { useContext, useEffect, useState } from "react";
import { Field, Form as FinalForm } from "react-final-form";
import { NavLink, RouteComponentProps } from "react-router-dom";
import {
  Button,
  Container,
  Form,
  Grid,
  Header,
  Segment,
} from "semantic-ui-react";
import { validate } from "uuid";
import { TextInput } from "../../App/common/form/TextInput";
import { TextInputIcon } from "../../App/common/form/TextInputIcon";
import { IUserFormValues, UserFormValues } from "../../App/models/user";
import { RootStoreContext } from "../../App/stores/RootStore";
import { ErrorMessage } from "./ErrorMessage";

export const EditProfile: React.FC = () => {
  // const validate = combineValidators({
  //   firstName: isRequired({ message: "Le prenom est obligatoire" }),
  //   lastName: isRequired({ message: "Le nom est obligatoire" }),
  // });

  const rootStore = useContext(RootStoreContext);
  const { loadUser } = rootStore.userStore;
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
        MODIFIER VOTRE PROFILE
      </Header>
      <Segment clearing style={{ marginBottom: "5em" }}>
        <FinalForm
          initialValues={user}
          onSubmit={(values: IUserFormValues) => console.log(values)}
          render={({
            handleSubmit,
            invalid,
            submitError,
            pristine,
            dirtySinceLastSubmit,
          }) => (
            <Form loading={loading} onSubmit={handleSubmit} error>
              <Field
                placeholder="Prenom"
                name="firstName"
                component={TextInput}
              />
              <Field placeholder="Nom" name="lastName" component={TextInput} />
              <Field
                placeholder="Email"
                name="username"
                icon="mail"
                component={TextInputIcon}
              />
              <Field
                placeholder="Telephone"
                name="phoneNumber"
                icon="phone"
                component={TextInputIcon}
              />
              {submitError && !dirtySinceLastSubmit && (
                <ErrorMessage error={submitError} text={submitError} />
              )}
              <Grid stackable>
                <Grid.Row>
                  <Grid.Column>
                    <Button
                      disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                      fluid
                      color="yellow"
                      type="submit"
                      content="MODIFIER"
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
