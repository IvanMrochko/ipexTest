import { getSingleCity, getMultipleCity } from "../../../services/axios-base";
import * as actionTypes from "../actionTypes";

// SEARCH ACTIONS
export const searchWeather = city => {
  return dispatch => {
    dispatch(searchWeatherRequest());
    getSingleCity(city)
      .then(response => {
        const data = {
          city: response.name,
          country: response.sys.country,
          cloudiness: response.weather[0].description,
          temperature: response.main.temp,
          humidity: response.main.humidity,
          wind: response.wind.speed,
          id: response.id
        };
        dispatch(searchWeatherSuccess(data));
      })
      .catch(error => {
        dispatch(searchWeatherError(error));
        dispatch(searchWeatherErrorDisable());
        console.log(error);
      });
  };
};

export const searchWeatherRequest = () => {
  return { type: actionTypes.SEARCH_REQUEST };
};

export const searchWeatherSuccess = data => {
  return { type: actionTypes.SEARCH_SUCCESS, data: data };
};
export const searchWeatherError = error => {
  return { type: actionTypes.SEARCH_ERROR, error: error };
};
export const searchWeatherErrorDisable = () => {
  return { type: actionTypes.SEARCH_ERROR_DISABLE };
};
//------------------
export const searchAddToList = city => {
  return { type: actionTypes.SEARCH_ADD_TO_LIST, data: city };
};

//UPDATE CITY WEATHER
export const searchUpdateCity = city => {
  return dispatch => {
    dispatch(searchUpdateCityRequest());
    getSingleCity(city)
      .then(response => {
        const data = {
          city: response.name,
          country: response.sys.country,
          cloudiness: response.weather[0].description,
          temperature: response.main.temp,
          humidity: response.main.humidity,
          wind: response.wind.speed,
          id: response.id
        };
        dispatch(searchUpdateCitySuccess(data));
      })
      .catch(error => {
        dispatch(searchUpdateCityError(error));
        console.log(error);
      });
  };
};
export const searchUpdateCityRequest = () => {
  return { type: actionTypes.SEARCH_UPDATE_CITY_REQUEST };
};

export const searchUpdateCitySuccess = data => {
  return { type: actionTypes.SEARCH_UPDATE_CITY_SUCCESS, data: data };
};
export const searchUpdateCityError = error => {
  return { type: actionTypes.SEARCH_UPDATE_ERROR, error: error };
};
//--------------------------

//DELETE CITY
export const searchDeleteCity = data => {
  return { type: actionTypes.SEARCH_REMOVE_FROM_LIST, data: data };
};
//---------------------------

//UPDATE ALL
//UPDATE CITY WEATHER
export const searchUpdateAllCity = cityList => {
  return dispatch => {
    dispatch(searchUpdateCityAllRequest());
    getMultipleCity(cityList)
      .then(response => {
        const data = response.list.map(value => {
          return {
            temperature: value.main.temp,
            id: value.id
          };
        });
        dispatch(searchUpdateCityAllSuccess(data));
      })
      .catch(error => {
        dispatch(searchUpdateCityAllError(error));
        console.log(error);
      });
  };
};
export const searchUpdateCityAllRequest = () => {
  return { type: actionTypes.SEARCH_UPDATE_ALL_CITY_REQUEST };
};

export const searchUpdateCityAllSuccess = data => {
  return { type: actionTypes.SEARCH_UPDATE_ALL_CITY_SUCCESS, data: data };
};
export const searchUpdateCityAllError = error => {
  return { type: actionTypes.SEARCH_UPDATE_ALL_CITY_ERROR, error: error };
};
//
