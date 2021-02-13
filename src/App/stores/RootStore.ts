import { configure } from "mobx";
import { createContext } from "react";
import UserStore from "./UserStore";
import CommonStore from "./CommonStore";
import AddressStore from "./AddressStore";
import AdStore from './AdStore';
import ModalStore from '../common/modal/modalStore';

configure({ enforceActions: "always" });

export class RootStore {
  modalStore: ModalStore;
  userStore: UserStore;
  commonStore: CommonStore;
  addressStore: AddressStore;
  adStore: AdStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.commonStore = new CommonStore(this);
    this.addressStore = new AddressStore(this);
    this.adStore = new AdStore(this);
    this.modalStore = new ModalStore(this)
  }
}

export const RootStoreContext = createContext(new RootStore());
