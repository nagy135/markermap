export interface LogState {
  userId: string | null;
}

const initialState = {
  userId: null,
};

export type TLoginPayload = {
  userId: string;
};

export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

export type Action = { type: string; payload: TLoginPayload };

export const logReducer = (state: LogState = initialState, action: Action) => {
  switch (action.type) {
    case "LOG_IN": {
      return {
        userId: action.payload.userId,
      };
    }
    case "LOG_OUT": {
      return {
        userId: null,
      };
    }
    default:
      return state;
  }
};
