import {http} from "../utils/http";
import {action, computed, observable} from 'mobx';

export class Auth{
    @observable data = [];


  constructor(context) {
    this.context = context;
  }


  @computed
  get userData() {
    if(!this.context.token) {
      return {
        // user_id: '',
        // role: '',
        // email:'',
        // partner_id: '',
        // full_name: '',
        member_email: ''
      };
    }
    console.log(JSON.parse(atob(this.context.token.split('.')[1])))
    return JSON.parse(atob(this.context.token.split('.')[1]));
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