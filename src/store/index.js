import { action, observable } from 'mobx';
import { UiStore } from "./ui";
import { Auth } from './auth';
import { MemberStore } from './member';
import {TransaksiStore} from './transaksi';

export class Store {
  @observable token = "";

  ui = new UiStore(this);
  auth = new Auth(this);
  member = new MemberStore(this);
  transaksi = new TransaksiStore(this);

  @observable testObs = 'umu';

  @action
  setToken(token) {
    this.http.setToken(token);
    this.token = token;
  }

}
