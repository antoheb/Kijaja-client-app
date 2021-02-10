import { observer } from "mobx-react-lite";
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
import { AddressFormValues, IAddress } from "../../App/models/address";
import { RootStoreContext } from "../../App/stores/RootStore";

const AddressForm: React.FC = () => {
  const validate = combineValidators({
    province: isRequired({ message: "La province est obligatoire" }),
    street: isRequired({ message: "L'address est obligatoire" }),
    city: isRequired({ message: "La ville est obligatoire" }),
    postalCode: isRequired({ message: "Le code postal est obligatoire" }),
    country: isRequired({ message: "Le pays obligatoire" }),
  });

  const {
    addNewAddress,
    modifyAddress,
    loadAddress,
    loadingInitial,
  } = useContext(RootStoreContext).addressStore;
  const [address, setAddress] = useState(new AddressFormValues());

  useEffect(() => {
    loadAddress().then((address) => setAddress(new AddressFormValues(address)));
  }, [loadAddress]);

  const submitForm = (values: IAddress) => {
    if (address.street != null) {
      modifyAddress(values).catch((error) => handleError(error));
    } else {
      addNewAddress(values).catch((error) => handleError(error));
    }
  };

  const handleError = (error: any) => {
    alert(error);
  };

  return (
    <Container fluid style={{ marginTop: "50px", width: "600px" }}>
      <Header as="h3" textAlign="center">
        {address ? ("MODIFY YOUR ADDRESS") : ("ADD AN ADDRESS")}
      </Header>
      <Segment clearing style={{ marginTop: "2em", marginBottom: "3em" }}>
          <FinalForm
            initialValues={address}
            validate={validate}
            onSubmit={(values: IAddress) => submitForm(values)}
            render={({
              handleSubmit,
              invalid,
              pristine,
              dirtySinceLastSubmit,
            }) => (
              <Form loading={loadingInitial} onSubmit={handleSubmit} error>
                <Field
                  placeholder="Pays"
                  name="country"
                  component={TextInput}
                />
                <Field
                  placeholder="Address"
                  name="street"
                  component={TextInput}
                />
                <Field placeholder="Ville" name="city" component={TextInput} />
                <Field
                  placeholder="Province"
                  name="province"
                  component={TextInput}
                />
                <Field
                  placeholder="Code Postal"
                  name="postalCode"
                  component={TextInput}
                />
                <Grid stackable>
                  <Grid.Row>
                    <Grid.Column>
                      <Button
                        disabled={
                          (invalid && !dirtySinceLastSubmit) || pristine
                        }
                        fluid
                        color="yellow"
                        type="submit"
                        content="AJOUTER"
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

export default observer(AddressForm);
