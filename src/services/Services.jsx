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

  addNewLocation(id, query) {
    return axios.post(Backend_API_URL + "/" + id + "/add_location", query);
  }

  getWeatherinfo(lat, long, location) {
    return fetch(
      `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&exclude=alerts&appid=ad46bca0cb15937504da590a8559bbae`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.current.clouds);
        return data;
      })
      .catch((err) => {
        console.error("Call Failed", err);
        throw err;
      });
  }
}

export default new Services();
