import { configureStore } from '@reduxjs/toolkit'
import markerReducer from './slices/markerSlice';

export default configureStore({
  reducer: {
      marker: markerReducer
  },
})
