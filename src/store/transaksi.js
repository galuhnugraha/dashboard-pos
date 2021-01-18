import { http } from '../utils/http';
import { action, observable } from 'mobx';


export class TransaksiStore {
    @observable data = [];
    @observable isLoading = false;

    @action
    async getTransaksi() {
        const token = localStorage.getItem("token")
        const data = await http.get('/transaksi').set({ 'authorization': `Bearer ${token}` });
        this.data = data.body.data;
    }
}
