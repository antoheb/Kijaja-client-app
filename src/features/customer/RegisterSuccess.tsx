import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Container, Header, Icon, Segment } from "semantic-ui-react";
import Agent from "../../App/api/Agent";
import queryString from "query-string";

const RegisterSuccess: React.FC<RouteComponentProps> = ({ location }) => {
    const { email } = queryString.parse(location.search);
  
    const handleConfirmEmailResend = () => {
      Agent.Users.resendEmailVerification(email as string)
        .then(() => {
          toast.success(
            "Courriel de verification - veuillez verifier votre boite mail"
          );
        })
        .catch((error) => console.log(error));
    };
  
    return (
      <Container fluid style={{marginBottom:'5em', marginTop:"5em", width: "600px" }}>
        <Segment placeholder textAlign="center">
          <Header icon>
            <Icon name="check" />
            Création du compte réussie avec succès!
          </Header>
          <Segment.Inline>
            <div className="center">
              <p>
                Regardez vos emails (incluant vos courriers indésirables) pour
                vérifier votre compte!
              </p>
              {email && (
                <>
                  <p style={{ textAlign: "center", paddingBottom: "20px" }}>
                    Toujours pas reçu de email ? Cliquez ici
                  </p>
                  <Button
                    content="Renvoyer le mail"
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