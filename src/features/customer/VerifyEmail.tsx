import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import queryString from "query-string";
import Agent from "../../App/api/Agent";
import { history } from "../../index";
import { Button, Container, Header, Icon, Segment } from "semantic-ui-react";

const VerifyEmail: React.FC<RouteComponentProps> = ({ location }) => {
  const Status = {
    Veryfing: "Verifying",
    Failed: "Failed",
    Success: "Success",
  };

  const [status, setStatus] = useState(Status.Veryfing);
  const { token, email } = queryString.parse(location.search);

  useEffect(() => {
    Agent.Users.verifyEmail(token as string, email as string)
      .then(() => {
        setStatus(Status.Success);
      })
      .catch(() => {
        setStatus(Status.Failed);
      });
  }, [Status.Failed, Status.Success, token, email]);

  const handleConfirmEmailResend = () => {
    Agent.Users.resendEmailVerification(email as string)
      .then(() => {
        alert("Email verification send - please verify your mail box");
      })
      .catch((error) => console.log(error));
  };

  const goToLogin = () => {
    history.push("/signIn");
  };

  const getBody = () => {
    switch (status) {
      case Status.Veryfing:
        return <p>Verified</p>;
      case Status.Failed:
        return (
          <div className="center">
            <p>
              The email verification did not work properly - you can click here
              to send a new verification link
            </p>
            <Button
              onClick={handleConfirmEmailResend}
              primary
              size="huge"
              content="Send Mail Again"
              style={{ backgroundColor: "#00c4b3", color: "white" }}
            />
          </div>
        );
      case Status.Success:
        return (
          <div className="center" style={{ textAlign: "center" }}>
            <p>Email confirm - you can now login</p>
            <Button
              onClick={goToLogin}
              color="yellow"
              size="large"
              content="Login"
            />
          </div>
        );
    }
  };
  return (
    <Container
      fluid
      style={{ width: "500px", marginBottom: "5em", marginTop: "5em" }}
    >
      <Segment placeholder>
        <Header icon>
          <Icon name="envelope" />
          Email verification
        </Header>
        <Segment.Inline>{getBody()}</Segment.Inline>
      </Segment>
    </Container>
  );
};

export default VerifyEmail;
