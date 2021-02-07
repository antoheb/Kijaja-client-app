import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header, Form, Button, Segment } from 'semantic-ui-react';
import { Field, Form as FinalForm } from 'react-final-form';
import { TextInputIcon } from '../../App/common/form/TextInputIcon';
import { observer } from 'mobx-react-lite';
import Agent from '../../App/api/Agent';
import ReCAPTCHA from 'react-google-recaptcha';

const SignInForm = () => {
  const [captchaCompleted, setCaptchaCompleted] = useState(false);

  const handleSubmit = (values: any) => {
    if (captchaCompleted)
    Agent.test.helloworld();
    else
      alert('You must complete the captcha before loging in');
  };

  return (
    <Fragment>
      <Grid centered style={{ marginTop: '120px', marginBottom: '120px' }}>
        <Grid.Column width={8}>
          <Segment>
            <Header as='h1'>SIGN IN</Header>
            <br />
            <FinalForm
              onSubmit={(values) => handleSubmit(values)}
              render={({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} error>
                  <Field
                    placeholder='fido@dogmail.com'
                    name='username'
                    icon='mail'
                    component={TextInputIcon}
                  />
                  <Field
                    placeholder='Password'
                    name='password'
                    icon='lock'
                    type='password'
                    component={TextInputIcon}
                  />
                  <br />
                  <Button
                    floated='left'
                    basic
                    color='black'
                    content='SIGN UP'
                    as={Link}
                    to={'/register'}
                  />
                  <Button
                    float='left'
                    basic
                    color='yellow'
                    type='submit'
                    content='LOG IN'
                  />
                </Form>
              )}
            />
            <ReCAPTCHA
              sitekey='6LcJUk0aAAAAAHGjxbF1chIihCAj4I5IU1bsLniP'
              onChange={(value) => setCaptchaCompleted(true)}
              size='normal'
              type='image'
            />
          </Segment>
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default observer(SignInForm);
