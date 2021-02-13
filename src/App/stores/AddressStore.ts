import { makeObservable, observable, action, runInAction } from "mobx";
import Agent from "../api/Agent";
import { IAddress } from "../models/address";
import { RootStore } from "./RootStore";

export default class AddressStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }

  @observable address: IAddress | null = null;
  @observable loadingInitial = false;

  @action addNewAddress = async (values: IAddress) => {
    this.loadingInitial = true;
    try {
      await Agent.Address.create(values);
      runInAction(() => {
        this.loadingInitial = false;
      });
      alert("Your address has been created");
    } catch (error) {
      this.loadingInitial = false;
      throw error;
    }
  };

  @action modifyAddress = async (values: IAddress) => {
    this.loadingInitial = true;
    try {
      await Agent.Address.modify(values);
      runInAction(() => {
        this.loadingInitial = false;
      });
      alert("Your address has been modified");
    } catch (error) {
      this.loadingInitial = false;
      throw error;
    }
  };

  @action loadAddress = async () => {
    this.loadingInitial = true;
    try {
      const address = await Agent.Address.loadAddress();
      runInAction(() => {
        this.address = address;
        this.loadingInitial = false;
      });
      return address;
    } catch (error) {
      this.loadingInitial = false;
      throw error;
    }
  };
}
