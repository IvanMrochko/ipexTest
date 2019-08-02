import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const configureStore = reducers => {
  const composeEnhancers =
    process.env.NODE_ENV === "development"
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : null || compose;
  return createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
