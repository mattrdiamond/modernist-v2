import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
import rootReducer from "./root-reducer";

const middlewares = [logger];

// spread all middlewares into applyMiddleware function as individual arguments
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// persistStore allows browser to cache store using localStorage
export const persistor = persistStore(store);

export default { store, persistor };
