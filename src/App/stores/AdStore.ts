import Agent from '../api/Agent';
import { action, observable } from 'mobx';
import { IAds } from '../models/ads';
import { RootStore } from './RootStore';

export default class AdStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable adsList: IAds[] | undefined = undefined;

  @action loadAds = async () => {
    try {
      this.adsList = await Agent.Ads.List();
    } catch (error) {
      console.log(error);
    }
  };
}
