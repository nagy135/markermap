export interface LogState {
  loggedUser: string | null;
}

const initialState = {
  loggedUser: null,
};

export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

export type Action = { type: string; user: string };

export const logReducer = (state: LogState = initialState, action: Action) => {
  switch (action.type) {
    case "LOG_IN": {
      return {
        loggedUser: action.user,
      };
    }
    case "LOG_OUT": {
      return {
        loggedUser: null,
      };
    }
    default:
      return state;
  }
};
