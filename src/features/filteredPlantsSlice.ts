import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PlantCardProps } from '../shared/types';
import { objectToArray } from '../shared/utils/objectToArray';

const initialData: PlantCardProps[] = [];

const initialState = {
  filteredPlants: initialData as PlantCardProps[],
};

/**
 * @description Fetch the plants from external API filtered by the selected tag and dispatch the data to the Redux store
 */
export const getFilteredPlants = createAsyncThunk(
  'filteredPlants/getFilteredPlants',
  async (selectedTag: string, { rejectWithValue, dispatch }) => {
    try {
      const res = await fetch(
        `https://dev.api.agrilution.com/plantData.json`, {
        // 'https://github.com/mlatysheva/home_farming_app_api/blob/main/data.json', {
        }
      );
      const data = await res.json();
      const plants = objectToArray(data);
      if (selectedTag) {
      const filteredPlants = plants.filter((plant) => {
        return (plant.tags).includes(selectedTag);
      });
      dispatch(setFilteredPlants(filteredPlants));
    } else {
      dispatch(setFilteredPlants(''));
    }
    } catch (error) {
      console.log(error);
    }
  }
);

/**
 * @description Redux slice for the plants data
 */
export const filteredPlantsSlice = createSlice({
  name: 'filteredPlants',
  initialState,
  reducers: {
    setFilteredPlants: (state, action) => {
      state.filteredPlants = action.payload;
    }
  },
});

export const { setFilteredPlants } = filteredPlantsSlice.actions;

export default filteredPlantsSlice.reducer;
