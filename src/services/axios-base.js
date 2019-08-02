import axios from "axios";

const baseURLSingle = `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?&units=metric&appid=2487ca0246e6cb3bd0f3d97f2f749ca7`;
const baseURLMultiple = `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/group?&units=metric&appid=2487ca0246e6cb3bd0f3d97f2f749ca7`;
export const getSingleCity = location => {
  var encodedLocation = encodeURIComponent(location);
  var requrl = `${baseURLSingle}&q=${encodedLocation}`;
  return axios.get(requrl).then(
    res => {
      if (res.data.cod === 200) {
        return res.data;
      }
      throw res.data.cod;
    },
    res => {
      throw (res &&
        ((res.response &&
          res.response.data &&
          (res.response.data.message || res.response.data)) ||
          res.code)) ||
        res;
    }
  );
};

export const getMultipleCity = location => {
  var encodedLocation = encodeURIComponent(location);
  var requrl = `${baseURLMultiple}&id=${encodedLocation}`;
  return axios.get(requrl).then(
    res => {
      if (res.status === 200) {
        return res.data;
      }
      throw res.data.cod;
    },
    res => {
      throw (res &&
        ((res.response &&
          res.response.data &&
          (res.response.data.message || res.response.data)) ||
          res.code)) ||
        res;
    }
  );
};
