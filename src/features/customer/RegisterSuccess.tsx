import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Button, Container, Header, Icon, Segment } from "semantic-ui-react";
import Agent from "../../App/api/Agent";
import queryString from "query-string";

const RegisterSuccess: React.FC<RouteComponentProps> = ({ location }) => {
    const { email } = queryString.parse(location.search);
  
    const handleConfirmEmailResend = () => {
      Agent.Users.resendEmailVerification(email as string)
        .then(() => {
          alert(
            "Email verification - please verify your mail box"
          );
        })
        .catch((error) => console.log(error));
    };
  
    return (
      <Container fluid style={{marginBottom:'5em', marginTop:"5em", width: "600px" }}>
        <Segment placeholder textAlign="center">
          <Header icon>
            <Icon name="check" />
            New account created with success!
          </Header>
          <Segment.Inline>
            <div className="center">
              <p>
                Look your mail box (including your junk mail) to
                verify your account!
              </p>
              {email && (
                <>
                  <p style={{ textAlign: "center", paddingBottom: "20px" }}>
                    Still not receive anything ? Click Here
                  </p>
                  <Button
                    content="Send Mail Again"
                    size="huge"
                    color="yellow"
                    onClick={handleConfirmEmailResend}
                  />
                </>
              )}
            </div>
          </Segment.Inline>
        </Segment>
      </Container>
    );
  };
  
  export default RegisterSuccess;