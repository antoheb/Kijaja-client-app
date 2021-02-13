import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Container, Header, Segment, Item } from "semantic-ui-react";
import { AddressFormValues } from "../../App/models/address";
import { RootStoreContext } from "../../App/stores/RootStore";

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
          </Item.Content>
      </Segment>
    </Container>
  );
};

export default observer(AddressPresentation);
