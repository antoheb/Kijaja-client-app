import React, { useContext, useEffect, useState } from "react";
import { Field, Form as FinalForm } from "react-final-form";
import {
  Button,
  Container,
  Form,
  Grid,
  Header,
  Segment,
} from "semantic-ui-react";
import { TextInput } from "../../App/common/form/TextInput";
import { RootStoreContext } from "../../App/stores/RootStore";
import { ErrorMessage } from "../form/ErrorMessage";
import { AdsFormValues, IAds } from "../../App/models/ads";
import { TextAreaInput } from "../../App/common/form/TextAreaInput";
import { SelectInput } from "../../App/common/form/SelectInput";
import { Category } from "../../App/common/options/CategoryOptions";
import { StatusOpt } from "../../App/common/options/StatusOptions";
import { observer } from "mobx-react-lite";
import { history } from "../..";
import { RouteComponentProps } from "react-router-dom";
import {
  combineValidators,
  isRequired,
} from "revalidate";
import { NumberInput } from '../../App/common/form/NumberInput';

interface RouteParams {
  id: string;
}

interface IProps extends RouteComponentProps<RouteParams> {}

const AdsForm: React.FC<IProps> = ({ match }) => {
  const validate = combineValidators({
    name: isRequired({ message: "Name is required" }),
    description: isRequired({ message: "Description cannot be empty" }),
    category: isRequired({ message: "Category cannot be empty" }),
    status: isRequired({ message: "Status is required" }),
  });

  const rootStore = useContext(RootStoreContext);
  const { createAds, loadAdDetails, modifyAds } = rootStore.adStore;
  const [ad, setAd] = useState(new AdsFormValues());
  const [loadingInitial, setLoading] = useState(true);
  const {openModal} = rootStore.modalStore

  useEffect(() => {
    if (match.params.id) {
      loadAdDetails(match.params.id)
        .then((ad) => setAd(new AdsFormValues(ad)))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [loadAdDetails, setAd, match.params.id, setLoading]);

  const handleSubmit = (values: IAds) => {
    if (match.params.id) {
      modifyAds(values, match.params.id).catch((error) => openModal(<ErrorMessage error={error}></ErrorMessage>));
    } else {
      createAds(values).catch((error) => openModal(<ErrorMessage error={error}></ErrorMessage>));
    }
  };

  return (
    <Container>
      <Grid centered>
        <Grid.Row style={{ marginTop: "2em", marginBottom: "2em" }}>
          <Grid.Column width={9}>
            <Header textAlign="center" as="h1" style={{ marginBottom: "1em" }}>
              {ad ? "Post New Ads" : "Modify Your Ad"}
            </Header>
            <Segment padded>
              <FinalForm
                validate={validate}
                initialValues={ad}
                onSubmit={(values: IAds) => handleSubmit(values)}
                render={({
                  handleSubmit,
                  invalid,
                  pristine,
                  submitError,
                  dirtySinceLastSubmit,
                }) => (
                  <Form loading={loadingInitial} onSubmit={handleSubmit} error>
                    <Field
                      placeholder="Item name"
                      name="name"
                      component={TextInput}
                    />
                    <Field
                      placeholder="Description"
                      name="description"
                      component={TextAreaInput}
                    />
                    <Field
                      placeholder="Price"
                      name="price"
                      component={NumberInput}
                    />
                    <Field
                      placeholder="Category"
                      name="category"
                      options={Category}
                      defaultValue={ad.category}
                      component={SelectInput}
                    />
                    <Field
                      placeholder="Picture"
                      name="picture"
                      component={TextInput}
                    />
                    <Field
                      placeholder="Status"
                      name="status"
                      options={StatusOpt}
                      component={SelectInput}
                    />
                    <Button
                      disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                      loading={loadingInitial}
                      fluid
                      color="yellow"
                      type="submit"
                      content={ad.id ? "MODIFY ADD" : "POST ADD"}
                    />
                    <br />
                    <Button
                      fluid
                      basic
                      color="black"
                      onClick={() => history.push("/user/account")}
                      content="CANCEL"
                    />
                  </Form>
                )}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default observer(AdsForm);
