import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PlantCardProps } from '../shared/types';
import { objectToArray } from '../shared/utils/objectToArray';
import data from '../data/data.json';

// Prepare initial data from JSON file in case the fetch to external API fails
const initialData = objectToArray(data);

const initialState = {
  plants: initialData as PlantCardProps[],
};

/**
 * @description Fetch the plants data from external API and dispatch the data to the Redux store
 */
export const getPlants = createAsyncThunk(
  'plants/getPlants',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.get(
        `https://dev.api.agrilution.com/plantData.json`
      );
      const plants = objectToArray(res.data);
      dispatch(setPlants(plants));
    } catch (error) {
      console.log(error);
    }
  }
);

/**
 * @description Redux slice for the plants data
 */
export const plantsSlice = createSlice({
  name: 'plants',
  initialState,
  reducers: {
    setPlants: (state, action) => {
      state.plants = action.payload;
    },
  },
});

export const { setPlants } = plantsSlice.actions;

export default plantsSlice.reducer;
