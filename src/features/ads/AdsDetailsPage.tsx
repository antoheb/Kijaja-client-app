import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Header,
  Card,
  Button,
  Image,
  Grid,
} from "semantic-ui-react";
import { LoadingComponent } from "../../App/common/loading/LoadingComponent";
import { AdsFormValues } from "../../App/models/ads";
import { RootStoreContext } from "../../App/stores/RootStore";
import { RouteComponentProps } from "react-router-dom";
import { history } from "../..";

interface RouteParams {
  id: string;
}

interface IProps extends RouteComponentProps<RouteParams> {}

const AdsDetailsPage: React.FC<IProps> = ({ match }) => {
  const rootStore = useContext(RootStoreContext);
  const { loadAdDetails } = rootStore.adStore;
  const [loading, setLoading] = useState(true);
  const [ad, setAd] = useState(new AdsFormValues());

  useEffect(() => {
    loadAdDetails(match.params.id)
      .then((ads) => setAd(new AdsFormValues(ads)))
      .finally(() => setLoading(false));
  });

  if (loading) return <LoadingComponent component="Loading ads..." />;
  else
    return (
      <Container fluid style={{ marginBottom: "10em" }}>
        <Grid centered style={{ marginTop: "5%" }}>
          <Grid.Row>
            <Grid.Column width={5}>
              <Image
                src={
                  !ad.picture
                    ? "https://aliceasmartialarts.com/wp-content/uploads/2017/04/default-image.jpg"
                    : ad.picture
                }
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <Card fluid style={{ height: "100%" }}>
                <Card.Header>
                  <Header content={ad.name} as="h1" textAlign="center" />
                </Card.Header>
                <Card.Meta>
                  <Header
                    style={{ marginLeft: "1em", marginTop: "30px" }}
                    as="h2"
                  >{`$ ${ad.price}`}</Header>
                </Card.Meta>
                <Card.Description>
                  <p
                    style={{
                      marginLeft: "2em",
                      marginRight: "2em",
                      marginTop: "30px",
                      marginBottom: "20px",
                    }}
                  >
                    {ad.status}
                  </p>
                </Card.Description>
                <Card.Content>
                  <p style={{ marginLeft: "1em" }}>{ad.description}</p>
                </Card.Content>
                <Card.Content extra>
                  <Button
                    basic
                    onClick={() => history.push("/ads")}
                    content="Come Back"
                    color="black"
                  />
                  <Button content="Make Offer" color="yellow" />
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
};

export default observer(AdsDetailsPage);
