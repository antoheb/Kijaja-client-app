import { FORM_ERROR} from "final-form";
import React, { useContext } from "react";
import { NavLink, RouteComponentProps } from "react-router-dom";
import { Button, Form, Grid, Item, Modal } from "semantic-ui-react";
import { RootStoreContext } from "../../App/stores/RootStore";
import { ErrorMessage } from "../form/ErrorMessage";
import { Form as FinalForm } from 'react-final-form';
import { observer } from "mobx-react-lite";

interface RouteParams {
    id: string;
}
  
interface IProps extends RouteComponentProps<RouteParams> {}

export const DeleteAlert: React.FC<IProps> = ({match}) => {
  const rootStore = useContext(RootStoreContext)
  const {deleteAds} = rootStore.adStore;
  
  return (
      <Grid
        style={{
          paddingTop: "5%",
          paddingBottom: "6%",
          marginLeft: "2%",
          marginRight: "2%",
        }}
      >
        <Grid.Row centered>
          <Item.Group>
            <Item>
              <Item.Content>
                <Item.Header style={{marginBottom:"5%"}}>
                  {"Etes-vous sure de vouloir supprimer votre compte?"}
                </Item.Header>
                <br />
                <Item.Description style={{marginBottom:"10%"}}>
                  Une fois supprimmer, votre compte ne sera plus existant et il
                  vous sera impossible de retrouver vos informations
                </Item.Description>
              </Item.Content>
            </Item>
            <Item>
              <Item.Content>
                <FinalForm
                  onSubmit={() =>
                    deleteAds(match.params.id).catch((error) => ({
                      [FORM_ERROR]: error,
                    }))
                  }
                  render={({ handleSubmit, submitError }) => (
                    <Form onSubmit={handleSubmit}>
                      {submitError && <ErrorMessage error={submitError} />}
                      <Button as={NavLink} to={"/user/account"}>
                        Annuler
                      </Button>
                      <Button type="submit">Supprimer mon compte</Button>
                    </Form>
                  )}
                />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Row>
      </Grid>
  );
};
