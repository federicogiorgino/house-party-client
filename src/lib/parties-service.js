import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

class Parties {
  constructor() {
    this.parties = axios.create({
      baseURL: `${baseUrl}/parties`,
      withCredentials: true
    });
  }

  getAll() {
    return this.parties.get().then(({ data }) => data);
  }

  getOne(id) {
    return this.parties.get(`/${id}`).then(({ data }) => data);
  }

  create(newParties) {
    return this.parties.post("/", newParties).then(({ data }) => data);
  }

  updateOne(id, partiesUpdated) {
    return this.parties.put(`/${id}`, partiesUpdated).then(({ data }) => data);
  }

  delete(id) {
    return this.parties.delete(`/${id}`).then(({ data }) => data);
  }
}

// `partiesService` is the object with the above axios request methods
const partiesService = new Parties();

export default partiesService;
