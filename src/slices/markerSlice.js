import { createSlice } from '@reduxjs/toolkit'

const initialSelectedState = {
    name: "",
    lat: "",
    lng: "",
    altitude: "",
    images: []
};

export const markerSlice = createSlice({
  name: 'marker',
  initialState: {
      selected: initialSelectedState
  },
  reducers: {
    change: (state, action) => {
        state.selected = action.payload;
    },
    clear: (state) => {
      state.selected = initialSelectedState;
    },
  },
})

// Action creators are generated for each case reducer function
export const { change, clear } = markerSlice.actions

export default markerSlice.reducer
