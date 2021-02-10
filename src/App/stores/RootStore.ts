import { configure } from "mobx";
import { createContext } from "react";
import UserStore from "./UserStore";
import CommonStore from "./CommonStore";
import AddressStore from "./AddressStore";
import AdStore from './AdStore';

configure({ enforceActions: "always" });

export class RootStore {
  userStore: UserStore;
  commonStore: CommonStore;
  addressStore: AddressStore;
  adStore: AdStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.commonStore = new CommonStore(this);
    this.addressStore = new AddressStore(this);
    this.adStore = new AdStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
