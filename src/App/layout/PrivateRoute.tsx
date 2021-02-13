import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom";
import { RootStoreContext } from "../stores/RootStore";

interface IProps extends RouteProps {
    component: React.ComponentType<RouteComponentProps<any>>;
  }
  
  const PrivateRoute: React.FC<IProps> = ({ component: Component, ...rest }) => {
    const { isLoggedIn } = useContext(RootStoreContext).userStore;
    return (
      <Route
        {...rest}
        render={(props) =>
          isLoggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect to={"/signIn"} />
          )
        }
      />
    );
  };
  
  export default observer(PrivateRoute);