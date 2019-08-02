import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/search";
import Loader from "react-loader";
import * as classes from "./index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Search = props => {
  const [value, setValue] = useState("");
  const notify = message => toast.info(message);
  const onSubmitForm = event => {
    event.preventDefault();
    props.onSearch(value);
  };

  if (props.error) {
    notify(props.error);
  }
  return (
    <div>
      <h4>Weather Search</h4>
      <div>
        <form onSubmit={onSubmitForm}>
          <input
            required
            name="search"
            value={value}
            onChange={event => setValue(event.target.value)}
            placeholder="Write city"
          />
          <button>Search</button>
        </form>
        <Loader loaded={!props.loading} className={classes.loader}>
          {props.data && (
            <div>
              <h2>
                Weather in {props.data.city}, {props.data.country}
              </h2>
              <h3>{props.data.temperature} °C</h3>
              <h3>Wind: {props.data.wind} m/s</h3>
              <h3>Humidity: {props.data.humidity} %</h3>
              <h3>Cloudiness: {props.data.cloudiness}</h3>
              <button onClick={() => props.onAddToList(props.data.city)}>
                {" "}
                Add {props.data.city} to list
              </button>
            </div>
          )}
        </Loader>
        <ToastContainer autoClose={2500} position="top-left" />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  let { error, loading, data } = state.search;
  return {
    error,
    loading,
    data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearch: city => dispatch(actions.searchWeather(city)),
    onAddToList: city => dispatch(actions.searchAddToList(city))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
