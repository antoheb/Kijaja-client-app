import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  Label,
  Segment,
} from "semantic-ui-react";
import { history } from "../..";
import { LoadingComponent } from "../../App/common/loading/LoadingComponent";
import { RootStoreContext } from "../../App/stores/RootStore";

const UserAdsCatalog = () => {
  const { getMyAds, userAds } = useContext(RootStoreContext).userStore;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyAds().then(() => setLoading(false));
  }, [getMyAds, setLoading]);

  if (loading) return <LoadingComponent component="Loading ads..." />;
  else
    return (
      <Container>
        {userAds?.length === 0 || !userAds ? (
          <div style={{ textAlign: "center", marginTop: "15%" }}>
            <Header as={"h2"}>You have no active ads at the moment.</Header>
            <Header as={"h4"}>
              Why not <a href="/">post an ad</a> now?
            </Header>
          </div>
        ) : (
          <Grid style={{ marginLeft: "10%" }}>
            <Grid.Row centered>
              <Header as="h1" textAlign="center">
                My Ads
              </Header>
            </Grid.Row>
            {userAds.map((ad) => (
              <Grid.Row>
                <Grid.Column width={5}>
                  <Image
                    style={{ width: "266px", height: "200px" }}
                    src={
                      !ad.picture
                        ? "https://aliceasmartialarts.com/wp-content/uploads/2017/04/default-image.jpg"
                        : ad.picture
                    }
                  />
                </Grid.Column>
                <Grid.Column width={8}>
                  <Card fluid style={{ height: "100%", paddingTop: "10px" }}>
                    <Label
                      size="medium"
                      floating
                      onClick={() => history.push(`/ads/delete/${ad.id}`)}
                      icon="trash"
                      color="red"
                    ></Label>
                    <Card.Header>
                      <Header content={ad.name} as="h3" textAlign="center" />
                    </Card.Header>
                    <Card.Meta>
                      <Header
                        style={{ marginLeft: "1em" }}
                        as="h4"
                      >{`$ ${ad.price}`}</Header>
                    </Card.Meta>
                    <Card.Description>
                      <p
                        style={{
                          marginLeft: "1em",
                        }}
                      >
                        {ad.status}
                      </p>
                    </Card.Description>
                    <Card.Content>
                      <p>{ad.description}</p>
                    </Card.Content>
                    <Card.Content extra>
                      <Button
                        onClick={() => history.push(`/ads/create/${ad.id}`)}
                        fluid
                        content="Modify my ads"
                        color="yellow"
                      />
                    </Card.Content>
                  </Card>
                </Grid.Column>
              </Grid.Row>
            ))}
          </Grid>
        )}
      </Container>
    );
};

export default observer(UserAdsCatalog);
