import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Container,
  Header,
  Button,
  List,
} from 'semantic-ui-react';

export const HomePage = () => {
  return (
    <Fragment>
      <Container textAlign='center' style={{marginTop: '5%', marginBottom: '7%'}}>
        <Header content='It all begins here...' size='huge' style={{marginBottom: '5%'}}/>
        <List>
          <List.Item style={{marginBottom: '3%'}}><Button content='Browse the ads!' color='google plus' as={NavLink} to='/ads'/></List.Item>
          <List.Item><Button content='Post your own ad!' color='instagram' as={NavLink} to='/ads/create'/></List.Item>
        </List>
      </Container>
    </Fragment>
  );
};
