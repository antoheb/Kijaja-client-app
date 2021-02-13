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
        alert("Email de vérification envoyé - regardez vos emails");
      })
      .catch((error) => console.log(error));
  };

  const goToLogin = () => {
    history.push("/signIn")
  };

  const getBody = () => {
    switch (status) {
      case Status.Veryfing:
        return <p>Verified</p>;
      case Status.Failed:
        return (
          <div className="center">
            <p>
              La vérification n'a pas fonctionné - vous pouvez cliquer pour
              envoyer un nouvel email de vérification
            </p>
            <Button
              onClick={handleConfirmEmailResend}
              primary
              size="huge"
              content="Renvoyer email"
              style={{ backgroundColor: "#00c4b3", color: "white" }}
            />
          </div>
        );
      case Status.Success:
        return (
          <div className="center" style={{ textAlign: "center" }}>
            <p>Email a été vérifié - vous pouvez vous connecter</p>
            <Button
              onClick={goToLogin}
              color="yellow"
              size="large"
              content="Connection"
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
          Vérification de l'addresse mail
        </Header>
        <Segment.Inline>{getBody()}</Segment.Inline>
      </Segment>
    </Container>
  );
};

export default VerifyEmail;
