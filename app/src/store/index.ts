import { combineReducers, createStore } from "redux";
import { logReducer } from "./logReducer";
import { mapReducer } from "./mapReducer";

const store = createStore(
  combineReducers({
    log: logReducer,
    map: mapReducer,
  })
);

export type TRootStore = ReturnType<typeof store.getState>;

export default store;
