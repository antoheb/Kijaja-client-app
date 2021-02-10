import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Header, Card, Button, Image } from 'semantic-ui-react';
import { LoadingComponent } from '../../App/common/loading/LoadingComponent';
import { RootStoreContext } from '../../App/stores/RootStore';

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
        <Header content='Browse ads' size='huge' textAlign='center' />
        {(adsList?.length === 0 || !adsList) ? (
          <Header content='No ads to display.' />
        ) : (
            <Card.Group itemsPerRow={3}>{adsList.map((ad) => (
                <Card>
                    <Image src={!ad.picture ? 'https://aliceasmartialarts.com/wp-content/uploads/2017/04/default-image.jpg' : ad.picture} />
                    <Card.Header>{ad.name}</Card.Header>
                    <Card.Meta>{`$ ${ad.price}`}</Card.Meta>
                    <Card.Description>{ad.description}</Card.Description>
                    <Card.Content extra><Button fluid content='See ad' color='instagram'/></Card.Content>
                </Card>
            ))}
              </Card.Group>
        )}
      </Container>
    );
};

export default observer(AdsShowcase);
