import { http } from "../utils/http";
import { action, observable } from 'mobx';

export class MemberStore {
  @observable isLoading = false;
  @observable data = [];
  @observable delete = [];
  @observable currentPage = 1;
  @observable pageSize = 10;
  @observable maxLength = 0;

  @observable selectedFilterValue = '';

  constructor(context) {
    this.context = context;
  }

  @action
  setPage(page = 1) {
    this.currentPage = page;
    this.getAll();
  }

  @action
  setSearch(page = 1) {
    this.currentPage = page;
    this.search();
  }

  @action
  setCurrentPage(current = 10) {
    this.pageSize = current;
    this.getAll();
  }

  @action
  async getAll() {
    this.isLoading = true;
    const token = localStorage.getItem("token")
    const data = await http.get(`/users/members?pagination=${this.currentPage}&limit=${this.pageSize}`).set({ 'authorization': `Bearer ${token}` });
    this.data = data.body.data;
    this.maxLength = data.body.totalData;

    this.isLoading = false;

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


  @action
  async search() {
    const token = localStorage.getItem("token")
    let filterValue = this.selectedFilterValue;

    const data = await http.get(`/users/search?search=${filterValue}`).set({ 'authorization': `Bearer ${token}` });
    this.data = data.body.data;
    this.isLoading = false;
  }
}