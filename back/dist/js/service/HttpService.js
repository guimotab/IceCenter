import axios from "axios";
export class HttpService {
    constructor(url) {
        this._url = "http://localhost:4000/" + url;
    }
    async get(id) {
        const resp = await axios.get(`${this._url}/${id}`);
        return resp.data;
    }
    async getAll() {
        const resp = await axios.get(`${this._url}`);
        return resp.data;
    }
    async putData(id, data) {
        const resp = await axios.put(`${this._url}/${id}`, data);
        return resp.data;
    }
    async postData(data) {
        const resp = await axios.post(`${this._url}`, data);
        return resp.data;
    }
    async deleteData(id) {
        const resp = await axios.delete(`${this._url}/${id}`);
        return resp.data;
    }
}
//# sourceMappingURL=HttpService.js.map