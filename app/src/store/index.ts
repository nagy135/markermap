import { combineReducers, createStore } from "redux";
import { mapReducer } from "./mapReducer";

const store = createStore(
  combineReducers({
    map: mapReducer,
  })
);

export type TRootStore = ReturnType<typeof store.getState>;

export default store;
