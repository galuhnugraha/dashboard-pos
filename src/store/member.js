import { http } from "../utils/http";
import { action, computed, observable } from 'mobx';

export class MemberStore {
  @observable isLoading = true;
  @observable data = [];
  @observable delete = [];

  constructor(context) {
    this.context = context;
  }


  @action
  getAll() {
    return http
      .get('/all')
      .then((res) => {
        console.log({ res }, "data member -> ");
        this.data = res.body.data;
        return res;
      })
      .catch((err) => {
        console.log("Error!", err);
        throw err;
      });
  }

  @action
  deleteAll = async (id) => {
    this.isLoading = true;
    return http.del(`/delete-param/${id}`).then(res => {
      this.delete = res.body.data;
      this.isLoading = false;
      return res;
    })
      .catch(err => {
        throw err;
      })
  }

  


  // addTable() {
  //   this.isLoading = true;
  //   return http.post('/reg', {
  //     email,name,phone
  //   })
  //     .then(res => {
  //       this.isLoading = false;
  //       console.log('ini');
  //       return res;
  //     })
  //     .catch(err => {
  //       console.log('err');
  //       throw err;
  //     })
  // }

  @action
  addTable(data) {
    return http.post('/reg',data)
      .then(res=>{
          console.log('ini');
          return res;
      })
      .catch(err=>{
          console.log('err');
          throw err;
      })
}



  @action
  editTable = async (id, data) => {
    this.isLoading = true;
    return http.put('/update-user' + `/${id}`, data)
      .then(res => {
        this.isLoading = false;
        return res;
      }).catch(err => {
        this.context.global_ui.closeLoading();
        this.isLoading = false;
        throw err;
      })
  }

}