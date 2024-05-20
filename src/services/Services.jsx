import axios from "axios";
import { resolve } from "chart.js/helpers";

const Backend_API_URL = "http://localhost:8082/user";
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

  addNewLocation(id, query) {
    return axios.post(Backend_API_URL + "/" + id + "/add_location", query);
  }

  getWeatherinfo(lat, long, location) {
    return axios.get(Backend_API_URL + "/weather/" + lat + "/" + long);
  }
}

export default new Services();
