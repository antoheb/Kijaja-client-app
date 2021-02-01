import { action, makeObservable, observable } from "mobx";
import Agent from "../api/Agent";
import { RootStore } from "./RootStore";

export default class CustomerStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
      makeObservable(this);
      this.rootStore = rootStore;
    }
  
    @observable messsage: String | null = null;
  
    @action test = async () => {
      try {
        this.messsage = await Agent.test.helloworld();
      } catch (error) {
        throw error;
      }
    };
}