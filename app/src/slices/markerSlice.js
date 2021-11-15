import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    selected: {
        name: "",
        lat: "",
        lng: "",
        altitude: "",
        images: []
    }
};

export const markerSlice = createSlice({
  name: 'marker',
  initialState: initialState,
  reducers: {
    change: (state, action) => {
        return {
            ...state,
            selected: action.payload
        }
    },
    clear: (_state) => {
        return initialState;
    },
  },
})

// Action creators are generated for each case reducer function
export const { change, clear } = markerSlice.actions

export default markerSlice.reducer
