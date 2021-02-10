import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Container,
  Grid,
  Header,
  Segment,
  Image,
  Button,
  List,
} from 'semantic-ui-react';
import NavBar from '../nav/NavBar';

export const HomePage = () => {
  return (
    <Fragment>
      <Segment inverted>
        <NavBar />
        <Image src='../../kijaja.png' size='small' centered />
        <Header
          as='h2'
          content='The Goto place for selling your used stuff!'
          inverted
          textAlign='center'
          style={{
            fontWeight: 'normal',
          }}
        />
      </Segment>
      <Container textAlign='center' style={{marginTop: '5%', marginBottom: '5%'}}>
        <Header content='It all begins here...' size='huge' style={{marginBottom: '5%'}}/>
        <List>
          <List.Item style={{marginBottom: '3%'}}><Button content='Browse the ads!' color='google plus' as={NavLink} to='/ads'/></List.Item>
          <List.Item><Button content='Post your own ad!' color='instagram' as={NavLink} to='/post'/></List.Item>
        </List>
      </Container>
    </Fragment>
  );
};
