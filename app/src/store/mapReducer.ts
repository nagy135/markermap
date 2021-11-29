import { TRecordResponse } from "../utils/record";

export interface MapState {
  selectedRecord?: TRecordResponse;
}

const initialState = {};

export type TLoginPayload = {
  selectedRecord?: TRecordResponse;
};

type TSelectAction = {
  type: typeof SELECT;
  payload: TLoginPayload;
};

type TDeselectAction = {
  type: typeof DESELECT;
};

type TActions = TSelectAction | TDeselectAction;

export const SELECT = "SELECT";
export const DESELECT = "DESELECT";

export const mapReducer = (
  state: MapState = initialState,
  action: TActions
) => {
  switch (action.type) {
    case "SELECT": {
      return {
        ...state,
        selectedRecord: action.payload.selectedRecord,
      };
    }
    case "DESELECT": {
      return {
        ...state,
        selectedRecord: undefined,
      };
    }
    default:
      return state;
  }
};
