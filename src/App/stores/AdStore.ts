import Agent from "../api/Agent";
import { action, observable } from "mobx";
import { IAds } from "../models/ads";
import { RootStore } from "./RootStore";
import { runInAction } from "mobx";
import { history } from "../../index";

export default class AdStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable adsList: IAds[] | undefined = undefined;
  @observable adsDetails: IAds | undefined = undefined;
  @observable loadingInitial: boolean = true;
  @observable formError: string = "";

  @action loadAds = async () => {
    try {
      this.adsList = await Agent.Ads.List();
    } catch (error) {
      throw error;
    }
  };

  @action loadAdDetails = async (id: string) => {
    try {
      this.adsDetails = await Agent.Ads.Details(id);
      this.loadingInitial = false;
      return this.adsDetails;
    } catch (error) {
      this.loadingInitial = false;
      throw error;
    }
  };

  @action createAds = async (values: IAds) => {
    try {
      await Agent.Ads.create(values);
      runInAction(() => {
        history.push("/user/account");
      });
      this.loadingInitial = false;
    } catch (error) {
      this.loadingInitial = false;
      throw error;
    }
  };

  @action modifyAds = async (values: IAds, id: string) => {
    try {
      await Agent.Ads.modify(id, values);
      runInAction(() => {
        history.push("/user/account");
      });
      this.loadingInitial = false;
    } catch (error) {
      this.loadingInitial = false;
      throw error;
    }
  };

  @action deleteAds = async (id: string) => {
    try {
      await Agent.Ads.delete(id);
      runInAction(() => {
        history.push("/user/account");
      });
      this.loadingInitial = false;
    } catch (error) {
      this.loadingInitial = false;
      throw error;
    }
  };
}
