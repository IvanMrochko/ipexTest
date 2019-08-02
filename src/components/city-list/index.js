import React from "react";
import { connect } from "react-redux";
import "./index.css";
import * as actions from "../../store/actions/search";
import Loader from "react-loader";
import "react-toastify/dist/ReactToastify.css";
const List = React.memo(props => {
  const getAllCity = () => {
    let citylist = props.list
      .map(value => {
        return value.id;
      })
      .join(",");
    props.onUpdateAll(citylist);
  };
  const everageTemp =
    props.list.length > 0
      ? props.list.reduce((acc, index) => acc + index.temperature, 0) /
        props.list.length
      : false;
  const dataList = props.list.map(value => {
    return (
      <tr key={value.city}>
        <td>{value.city}</td>
        <td>
          {value.temperature}/{value.currTemp ? value.currTemp : null}
        </td>
        <td>{value.wind}</td>
        <td>{value.humidity}</td>
        <td>{value.cloudiness}</td>
        <td>
          <button onClick={() => props.onUpdateCity(value.city)}>Update</button>
        </td>
        <td>
          <button onClick={() => props.onDeleteCity(value.city)}>Delete</button>
        </td>
      </tr>
    );
  });
  return (
    <div>
      <h4>City list</h4>
      <div className="container">
        <button onClick={() => getAllCity()}> Update all list</button>
        {everageTemp && (
          <div>Average temperature: {everageTemp.toFixed(2)}°C</div>
        )}
      </div>
      <div className="list" />
      <Loader loaded={!props.loadingUpdate} className="loader">
        <table className="minimalistBlack">
          <thead>
            <tr>
              <th>City Name</th>
              <th>Temp/Current temp</th>
              <th>Wind</th>
              <th>Humidity</th>
              <th>Cloudiness</th>
              <th />
              <th />
            </tr>
          </thead>

          <tbody>{dataList}</tbody>
        </table>
      </Loader>
    </div>
  );
});
const mapStateToProps = state => {
  let { error, loadingUpdate, list } = state.search;
  return {
    error,
    loadingUpdate,
    list
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateCity: city => dispatch(actions.searchUpdateCity(city)),
    onDeleteCity: city => dispatch(actions.searchDeleteCity(city)),
    onUpdateAll: cityList => dispatch(actions.searchUpdateAllCity(cityList))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
