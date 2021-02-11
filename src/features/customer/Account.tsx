import React, { useContext, useEffect, useState } from "react";
import { Grid, Button, Card, Image, Icon } from "semantic-ui-react";
import { RootStoreContext } from "../../App/stores/RootStore";
import { UserFormValues } from "../../App/models/user";
import AddressForm from "../form/AddressForm";
import { EditProfile } from "../form/EditProfile";
import { AddressFormValues } from "../../App/models/address";
import AddressPresentation from "../form/AddressPresentation";
import { RouteComponentProps } from "react-router-dom";
import UserAdsCatalog from "./UserAdsCatalog";
import { history } from "../..";

const Account: React.FC<RouteComponentProps> = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadUser } = rootStore.userStore;
  const { token } = rootStore.commonStore;
  const { loadAddress } = rootStore.addressStore;
  const [user, setUser] = useState(new UserFormValues());
  const [address, setAddress] = useState(new AddressFormValues());

  const Status = {
    editProfile: "EditProfile",
    addressForm: "addressForm",
    adsForm: "adsForm",
    postForm: "postForm",
    userAddress: "userAddress",
  };

  const [status, setStatus] = useState(Status.adsForm);

  useEffect(() => {
    if (token) {
      loadUser().then((user) => setUser(new UserFormValues(user)));
    }
  }, [loadUser, token, setUser]);

  useEffect(() => {
    if (user) {
      loadAddress().then((address) =>
        setAddress(new AddressFormValues(address))
      );
    }
  }, [loadAddress, user, setAddress]);

  const getBody = () => {
    switch (status) {
      case Status.adsForm:
        return <UserAdsCatalog />;
      case Status.editProfile:
        return (
          <div className="center">
            <EditProfile />
          </div>
        );
      case Status.addressForm:
        return (
          <div className="center">
            <AddressForm />
          </div>
        );
      case Status.userAddress:
        return (
          <div className="center">
            <AddressPresentation />
            <div style={{ textAlign: "center" }}>
              <Button
                onClick={() => setStatus(Status.addressForm)}
                content="Modify address"
                color="yellow"
              ></Button>
            </div>
          </div>
        );
      case Status.postForm:
        return (
          <div className="center" style={{ textAlign: "center" }}>
            <p>Messages Form</p>
          </div>
        );
    }
  };

  return (
    <Grid style={{ marginLeft: "2%" }}>
      <Grid.Row>
        <Grid.Column width={4}>
          <Card color="yellow" fluid>
            <Image src="unnamed.png" centered fluid />
            <Card.Content>
              <Card.Header>{user.firstName + " " + user.lastName}</Card.Header>
              <Card.Description>
                <Icon name="edit" />
                <a onClick={() => setStatus(Status.editProfile)}>
                  Edit profile
                </a>
              </Card.Description>
              <Card.Description>
                <Icon name="home" />
                {address.street ? (
                  <a onClick={() => setStatus(Status.userAddress)}>
                    My Address
                  </a>
                ) : (
                  <a onClick={() => setStatus(Status.addressForm)}>
                    Add Address
                  </a>
                )}
              </Card.Description>
            </Card.Content>
          </Card>
          <Button.Group basic color="yellow" vertical fluid>
            <Button onClick={() => setStatus(Status.adsForm)}>My Ads</Button>
            <Button onClick={() => history.push("/ads/create")}>
              Post New Ads
            </Button>
          </Button.Group>
        </Grid.Column>
        <Grid.Column width={12}>{getBody()}</Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Account;
