import { http } from "../utils/http";
import { action,observable } from 'mobx';

export class MemberStore {
  @observable isLoading = false;
  @observable data = [];
  @observable delete = [];
  baseUrl = `/all?pagination=${this.query.page}&limit=${this.query.limit}`;

  constructor(context) {
    this.context = context;
  }

  @observable query = {
    page: 1,
    limit: 20
};

  @action
  getAll() {
    this.isLoading = true;
    return http
      .get(this.baseUrl)
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
    return http.del(`/delete-param/${id}`).then(res => {
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
    return http.post('/reg',data)
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
    return http.put(`/update-param/${id}`).send(data)
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