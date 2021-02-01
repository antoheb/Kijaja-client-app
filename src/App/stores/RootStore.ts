import { configure } from "mobx";
import { createContext } from "react";
import CustomerStore from "./CustomerStore";

configure({ enforceActions: "always" });

export class RootStore {
  customerStore: CustomerStore;

  constructor() {
    this.customerStore = new CustomerStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
