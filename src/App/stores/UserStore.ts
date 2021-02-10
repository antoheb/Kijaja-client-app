import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { RootStore } from "./RootStore";
import { IUser, IUserFormValues } from "../models/user";
import Agent from "../api/Agent";
import { history } from "../../index";
import { IAds } from "../models/ads";

export default class UserStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }

  @observable user: IUser | null = null;
  @observable userAds: IAds[] | undefined = undefined;
  @observable loadingInitial = false;
  @observable passwordError: string | null = null;

  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action register = async (values: IUserFormValues) => {
    this.passwordError = null;
    if (values.password != values.confirmPassword) {
      this.passwordError = "Les mots de passes de sont pas identiques";
    } else {
      try {
        await Agent.Users.registerUser(values);
        history.push(`/user/registerSuccess?email=${values.email}`);
      } catch (error) {
        throw error;
      }
    }
  };

  @action loadUser = async () => {
    try {
      const user = await Agent.Users.current();
      runInAction(() => {
        this.user = user;
      });
      return user;
    } catch (error) {
      runInAction(() => {
        throw error;
      });
    }
  };

  @action login = async (values: IUserFormValues) => {
    this.loadingInitial = true;
    try {
      const user = await Agent.Users.login(values);
      runInAction(() => {
        this.user = user;
        this.rootStore.commonStore.setToken(user.token);
      });
      history.push("/");
      this.loadingInitial = false;
    } catch (error) {
      this.loadingInitial = false;
      throw error;
    }
  };

  @action logout = () => {
    this.loadingInitial = true;
    try {
      this.rootStore.commonStore.setToken(null);
      this.user = null;
      history.push("/");
      window.location.reload();
    } catch (error) {
      throw error;
    }
    this.loadingInitial = false;
  };

  @action getUser = async () => {
    this.loadingInitial = true;
    try {
      const user = await Agent.Users.current();
      runInAction(() => {
        this.user = user;
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingInitial = false;
        throw error;
      });
    }
  };

  // @action getMyAds = async () => {
  //   this.loadingInitial = true;
  //   try {
  //     const userAds = await Agent.Users.getMyAds();
  //     runInAction(() => {
  //       this.userAds = userAds;
  //     })
  //   } catch(error) {
  //     throw error;
  //   }
  // }
}
