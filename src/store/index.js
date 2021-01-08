import { action, observable } from 'mobx';
import { UiStore } from "./ui";
import { Auth } from './auth';
import { MemberStore } from './member';

export class Store {
  @observable token = "";

  ui = new UiStore(this);
  auth = new Auth(this);
  member = new MemberStore(this);

  @observable testObs = 'umu';

  @action
  setToken(token) {
    this.http.setToken(token);
    this.token = token;
  }

}
