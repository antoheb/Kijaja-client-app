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
import { ErrorMessage } from "./ErrorMessage";

const AddressForm: React.FC = () => {
  const validate = combineValidators({
    province: isRequired({ message: "State is required" }),
    street: isRequired({ message: "Street is required" }),
    city: isRequired({ message: "City is required" }),
    postalCode: isRequired({ message: "Postal code is required" }),
    country: isRequired({ message: "Country is required" }),
  });

  const {
    addNewAddress,
    modifyAddress,
    loadAddress,
    loadingInitial,
  } = useContext(RootStoreContext).addressStore;
  const [address, setAddress] = useState(new AddressFormValues());
  const {openModal} = useContext(RootStoreContext).modalStore;

  useEffect(() => {
    loadAddress().then((address) => setAddress(new AddressFormValues(address)));
  }, [loadAddress]);

  const submitForm = (values: IAddress) => {
    if (address.street != null) {
      modifyAddress(values).catch((error) => openModal(<ErrorMessage error={error}></ErrorMessage>));
    } else {
      addNewAddress(values).catch((error) => openModal(<ErrorMessage error={error}></ErrorMessage>));
    }
  };

  return (
    <Container fluid style={{ marginTop: "50px", width: "600px" }}>
      <Header as="h3" textAlign="center">
        {address ? "MODIFY YOUR ADDRESS" : "ADD AN ADDRESS"}
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
              <Field placeholder="Country" name="country" component={TextInput} />
              <Field
                placeholder="Address"
                name="street"
                component={TextInput}
              />
              <Field placeholder="City" name="city" component={TextInput} />
              <Field
                placeholder="Province"
                name="province"
                component={TextInput}
              />
              <Field
                placeholder="Postal Code"
                name="postalCode"
                component={TextInput}
              />
              <Grid stackable>
                <Grid.Row>
                  <Grid.Column>
                    <Button
                      loading={loadingInitial}
                      disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                      fluid
                      color="yellow"
                      type="submit"
                      content={address ? "MODIFY" : "ADD"}
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
