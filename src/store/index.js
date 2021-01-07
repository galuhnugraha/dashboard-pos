import { action, observable } from 'mobx';
import { UiStore } from "./ui";
import { Auth } from './auth';
import { Home } from './home';

export class Store {
  @observable token = "";

  ui = new UiStore(this);
  auth = new Auth(this);

  @observable testObs = 'umu';

  @action
  setToken(token) {
    this.http.setToken(token);
    this.token = token;
  }

}
