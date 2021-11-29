export interface MapState {
  selectedMarker?: string;
}

const initialState = {};

export type TLoginPayload = {
  selectedMarker?: string;
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
        selectedMarker: action.payload.selectedMarker,
      };
    }
    case "DESELECT": {
      return {
        ...state,
        selectedMarker: undefined,
      };
    }
    default:
      return state;
  }
};
