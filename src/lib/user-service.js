import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

class User {
  constructor() {
    this.user = axios.create({
      baseURL: `${baseUrl}/user`,
      withCredentials: true
    });
  }

  getAll() {
    return this.user.get().then(({ data }) => data);
  }

  getOne(id) {
    return this.user.get(`/${id}`).then(({ data }) => data);
  }

  updateOne(id, updatedUser) {
    return this.user.put(`/${id}`, updatedUser).then(({ data }) => data);
  }

  attendParty(id, partyId) {
    return this.user.put(`/${id}/attend-party/${partyId}`).then(({ data }) => data);
  }

  abandonParty(id, partyId) {
    return this.user.put(`/${id}/leave-party/${partyId}`).then(({ data }) => data);
  }

  getAllAttendingParties(id) {
    return this.user.put(`/${id}`).then(({ data }) => data.attendingParties);
  }
}

// `authService` is the object with the above axios request methods
const userService = new User();

export default userService;
