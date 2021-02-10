import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Container, Header, Segment, Item, Button } from "semantic-ui-react";
import { AddressFormValues, IAddress } from "../../App/models/address";
import { RootStoreContext } from "../../App/stores/RootStore";
import { history } from '../../index';

const AddressPresentation = () => {
  const { loadAddress } = useContext(RootStoreContext).addressStore;
  const [address, setAddress] = useState(new AddressFormValues());

  useEffect(() => {
    loadAddress().then((address) => setAddress(new AddressFormValues(address)));
  }, [loadAddress]);

  return (
    <Container fluid style={{ marginTop: "60px", width: "400px" }}>
      <Header as="h3" textAlign="center">
        YOUR ADDRESS
      </Header>
      <Segment clearing style={{ marginTop: "2em", marginBottom: "3em" }}>
        <Item.Content>
          <Header as={"h5"}>Your current address:</Header>
          <Item.Description>{address.street}</Item.Description>
          <Item.Description>
            {address.city + ", " + address.province + " " + address.postalCode}
          </Item.Description>
          <Item.Description>{address.country}</Item.Description>
          <Item.Description>
            <br />
          </Item.Description>
          <Item.Description>
            <Button
              onClick={() => history.push("/")}
              content="Modify address"
              color="yellow"
            ></Button>
          </Item.Description>
        </Item.Content>
      </Segment>
    </Container>
  );
};

export default observer(AddressPresentation);
