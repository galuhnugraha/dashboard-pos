import {http} from "../utils/http";
import {action, computed, observable} from 'mobx';

export class Auth{
    @observable data = [];


  constructor(context) {
    this.context = context;
  }

  @action 
  login = async ({email, password}) => {
    const loginResponse = await http.post('/login').send({email,password});

    if(loginResponse.body.message === 'success') {
      this.context.setToken(loginResponse.body.token);
    }
  }

  @action
  logout() {
    this.context.setToken();
  }

}