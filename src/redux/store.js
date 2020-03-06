import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootReducer from "./root-reducer";

const middlewares = [logger];

// spread all middlewares into applyMiddleware function as individual arguments
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
