import { createStore } from "redux";
import { logReducer } from "./logReducer";

export const store = createStore(logReducer);
