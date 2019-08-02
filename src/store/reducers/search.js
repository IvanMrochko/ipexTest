import * as actionTypes from "../../store/actions/actionTypes";

const initialState = {
  data: null,
  error: null,
  errorUpdate: null,
  loading: false,
  loadingUpdate: false,
  list: []
};
//SEARCH CITY
const searchRequest = (state, action) => {
  return {
    ...state,
    ...{
      loading: true,
      error: null
    }
  };
};
const searchSuccess = (state, action) => {
  return {
    ...state,
    ...{
      data: action.data,
      loading: false,
      error: null
    }
  };
};
const searchError = (state, action) => {
  return {
    ...state,
    ...{
      data: null,
      loading: false,
      error: action.error
    }
  };
};
const searchErrorDisable = (state, action) => {
  return {
    ...state,
    ...{
      error: null
    }
  };
};
const searchAddtoList = (state, action) => {
  let isSameCity = state.list.some(elem => elem.city == action.data);
  if (!isSameCity && state.list.length < 5) {
    return {
      ...state,
      list: [...state.list, state.data]
    };
  } else {
    return {
      ...state
    };
  }
};
//UPDATE CITY
const updateCityRequest = (state, action) => {
  return {
    ...state,
    ...{
      loadingUpdate: true,
      errorUpdate: null
    }
  };
};
const updateCitySuccess = (state, action) => {
  let updatedObject = state.list.reduce((acc, index) => {
    return index.city == action.data.city
      ? [...acc, { ...index, ...{ currTemp: action.data.temperature } }]
      : [...acc, index];
  }, []);
  return {
    ...state,
    ...{
      loadingUpdate: false,
      errorUpdate: null,
      list: updatedObject
    }
  };
};
const updateCityError = (state, action) => {
  return {
    ...state,
    ...{
      loadingUpdate: false,
      errorUpdate: action.error
    }
  };
};
//------------
//DELETE CITY FROM LIST
const deleteCity = (state, action) => {
  let updatedObject = state.list.reduce((acc, index) => {
    return index.city == action.data ? [...acc] : [...acc, index];
  }, []);
  return {
    ...state,
    ...{
      loadingUpdate: false,
      errorUpdate: null,
      list: updatedObject
    }
  };
};
//------------
//UPDATE ALL CITY
const updateCityAllRequest = (state, action) => {
  return {
    ...state,
    ...{
      loadingUpdate: true,
      errorUpdate: null
    }
  };
};
const updateCityAllSuccess = (state, action) => {
  let updatedObject = state.list.reduce((acc, value, index) => {
    return value.id == action.data[index].id
      ? [...acc, { ...value, ...{ currTemp: action.data[index].temperature } }]
      : [...acc, value];
  }, []);
  return {
    ...state,
    ...{
      loadingUpdate: false,
      errorUpdate: null,
      list: updatedObject
    }
  };
};
const updateCityAllError = (state, action) => {
  return {
    ...state,
    ...{
      loadingUpdate: false,
      errorUpdate: action.error
    }
  };
};
//------------
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_REQUEST:
      return searchRequest(state);
    case actionTypes.SEARCH_SUCCESS:
      return searchSuccess(state, action);
    case actionTypes.SEARCH_ERROR:
      return searchError(state, action);
    case actionTypes.SEARCH_ERROR_DISABLE:
      return searchErrorDisable(state, action);
    case actionTypes.SEARCH_ADD_TO_LIST:
      return searchAddtoList(state, action);
    case actionTypes.SEARCH_UPDATE_CITY_REQUEST:
      return updateCityRequest(state);
    case actionTypes.SEARCH_UPDATE_CITY_SUCCESS:
      return updateCitySuccess(state, action);
    case actionTypes.SEARCH_UPDATE_ERROR:
      return updateCityError(state, action);
    case actionTypes.SEARCH_REMOVE_FROM_LIST:
      return deleteCity(state, action);
    case actionTypes.SEARCH_UPDATE_ALL_CITY_REQUEST:
      return updateCityAllRequest(state);
    case actionTypes.SEARCH_UPDATE_ALL_CITY_SUCCESS:
      return updateCityAllSuccess(state, action);
    case actionTypes.SEARCH_UPDATE_ALL_CITY_ERROR:
      return updateCityAllError(state, action);
    default:
      return state;
  }
};

export default reducer;
