import { configureStore } from '@reduxjs/toolkit';
import plantsReducer from '../../features/plantsSlice';
import lightsReducer from '../../features/lightsSlice';
import selectedPlantReducer from '../../features/selectedPlantSlice';

/**
 * @description Redux store
 */
export const store = configureStore({
  reducer: {
    plants: plantsReducer,
    lights: lightsReducer,
    selectedPlant: selectedPlantReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;