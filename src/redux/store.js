import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { fetchCollectionsStart } from "./shop/shop.sagas";
import rootReducer from "./root-reducer";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [logger, sagaMiddleware];

// spread all middlewares into applyMiddleware function as individual arguments
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(fetchCollectionsStart);

// persistStore allows browser to cache store using localStorage
export const persistor = persistStore(store);

export default { store, persistor };
