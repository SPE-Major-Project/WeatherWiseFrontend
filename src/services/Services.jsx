import axios from "axios";

const Backend_API_URL = "http://localhost:8082/api/user";
class Services {
  addUser(user) {
    return axios.post(Backend_API_URL + "/register", user);
  }

  logInUser(user) {
    return axios.post(Backend_API_URL + "/login", user);
  }

  getLocation(id) {
    return axios.get(Backend_API_URL + "/get_locations/" + id);
  }
}

export default new Services();
