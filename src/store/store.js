import { combineReducers, configureStore } from "@reduxjs/toolkit";  
import authReducer from "../store/reducers/authSlice";
import { persistStore, persistReducer } from "redux-persist";
import colonyReducer from "../store/reducers/colonySlice";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer  = combineReducers({
    auth: authReducer,
    colonyState: colonyReducer,   
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

const persistor = persistStore(store);

export {store, persistor};