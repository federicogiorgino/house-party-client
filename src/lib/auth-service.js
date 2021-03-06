import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL;

class Auth {
  constructor() {
    this.auth = axios.create({
      baseURL: apiURL,
      withCredentials: true
    });
  }

  signup({ firstName, lastName, username, password, email, bio }) {
    return this.auth
      .post("/auth/signup", { firstName, lastName, username, password, email, bio })
      .then(({ data }) => data);
    // .then((response) => response.data);
  }

  login({ username, password }) {
    return this.auth.post("/auth/login", { username, password }).then(({ data }) => data);
    // .then((response) => response.data);
  }

  logout() {
    return this.auth.post("/auth/logout", {}).then(({ data }) => data);
    // return this.auth.post("/auth/logout", {}).then((response) => response.data);
  }

  me() {
    return this.auth.get("/auth/me").then(({ data }) => data);
    // return this.auth.get("/auth/me").then((response) => response.data);
  }
}

const authService = new Auth();
// `authService` is the object with the above axios request methods

export default authService;
