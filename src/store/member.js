import { http } from "../utils/http";
import { action, observable } from 'mobx';

export class MemberStore {
  @observable isLoading = false;
  @observable data = [];
  @observable delete = [];
  baseUrl = `/users/members?pagination=${this.query.page}&limit=${this.query.limit}`;
  token = localStorage.getItem("token")
  opts = {
    authorization: `Bearer ${this.token}`,
  }

  constructor(context) {
    this.context = context;
  }

  @observable query = {
    page: 1,
    limit: 3000
  };

  // @observable currentPageCarsIn = 1;
  //   @observable currentPageCarsOut = 1;
  //   @observable currentPageMatchingCars = 1;

  //   @observable totalPageCarsIn = 0;
  //   @observable totalPageCarsOut = 0;
  //   @observable totalPageMatchingCars = 0;

  //   @action
  //   setPageCarsIn(page=1) {
  //       this.currentPageCarsIn = page;
  //       this.getCarsIn();
  //   }

  //   @action
  //   setPageCarsOut(page=1) {
  //       this.currentPageCarsOut = page;
  //       this.getCarsOut();
  //   }

  //   @action
  //   setPageMatchingCars(page=1) {
  //       this.currentPageMatchingCars = page;
  //       this.getMatchingCars();
  //   }





  @action
  getAll() {
    this.isLoading = true;
    const token = localStorage.getItem("token")
    return http
      .get(this.baseUrl).set({ 'authorization': `Bearer ${token}` })
      .then((res) => {
        this.data = res.body.data;
        this.isLoading = false;
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }

  @action
  deleteAll = async (id) => {
    this.isLoading = true;
    const token = localStorage.getItem("token")
    return http.del(`/users/param-delete/${id}`).set({ 'authorization': `Bearer ${token}` }).then(res => {
      this.delete = res.body.data;
      this.isLoading = false;
      return res;
    })
      .catch(err => {
        throw err;
      })
  }

  @action
  addTable(data) {
    return http.post('/reg', data)
      .then(res => {
        return res;
      })
      .catch(err => {
        console.log('err');
        throw err;
      })
  }


  @action
  updateMember = async (id, data) => {
    this.isLoading = true;
    const token = localStorage.getItem("token")
    return http.put(`/users/param-update/${id}`).set({ 'authorization': `Bearer ${token}` }).send(data)
      .then((res) => {
        this.isLoading = false;
        return res;
      })
      .catch((err) => {
        this.isLoading = false;
        throw err;
      });
  }
}