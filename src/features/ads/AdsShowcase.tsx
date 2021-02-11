import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Header, Card, Button, Image } from 'semantic-ui-react';
import { LoadingComponent } from '../../App/common/loading/LoadingComponent';
import { RootStoreContext } from '../../App/stores/RootStore';
import { history } from '../../index';

const AdsShowcase = () => {
  const { loadAds, adsList } = useContext(RootStoreContext).adStore;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAds().then(() => setLoading(false));
  }, [loadAds]);

  if (loading) return <LoadingComponent component='Loading ads...' />;
  else
    return (
      <Container>
        <Header content='Browse ads' as="h1" textAlign='center' />
        {(adsList?.length === 0 || !adsList) ? (
          <Header content='No ads to display.' />
        ) : (
            <Card.Group itemsPerRow={3}>{adsList.map((ad) => (
                <Card>
                    <Image style={{width:"367px", height:"267px"}} src={!ad.picture ? 'https://aliceasmartialarts.com/wp-content/uploads/2017/04/default-image.jpg' : ad.picture} />
                    <Card.Header style={{marginBottom:"10px", marginTop:"10px"}}><Header textAlign="center" as="h3">{ad.name}</Header></Card.Header>
                    <Card.Content>{`$ ${ad.price}`}</Card.Content>
                    <Card.Content>{ad.status}</Card.Content>
                    <Card.Content extra><Button onClick={() => history.push(`/ads/details/${ad.id}`)} fluid content='See ad' color='yellow'/></Card.Content>
                </Card>
            ))}
              </Card.Group>
        )}
      </Container>
    );
};

export default observer(AdsShowcase);
