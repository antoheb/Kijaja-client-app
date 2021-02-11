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
                  {"Are you sure you want to delete this ad?"}
                </Item.Header>
                <br />
                <Item.Description style={{marginBottom:"5%"}}>
                  Once deleted, your will not be able to recover your ad. Do you still want to delete this ad?
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
                    <Form onSubmit={handleSubmit} error>
                      <Button color="black" basic as={NavLink} to={"/user/account"}>
                        CANCEL
                      </Button>
                      <Button type="submit" color="red">DELETE AD</Button>
                      {submitError && <ErrorMessage error={submitError} />}
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
