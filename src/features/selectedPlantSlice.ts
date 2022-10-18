import { createSlice } from '@reduxjs/toolkit';
import { PlantCardProps } from '../shared/types';
import data from '../data/data.json';
import { objectToArray } from "../shared/utils/objectToArray";

/**
 * @description take the plant data from JSON file or external API if plant ID is kept in LS, 
 * otherwise the first plant in the JSON file
 * @returns PlantCardProps object
 */
const setInitialPlant = () => {
  const initialData = objectToArray(data);
  const firstPlant = initialData[0];
  const plant = localStorage.getItem('selectedPlant');
  if (plant) {
    const plantID = JSON.parse(plant);
    const plantData = initialData.find((plant: PlantCardProps) => plant.id === plantID);
    return plantData;
  } else {
    return firstPlant;
  }
};

const initialState = {
  selectedPlant: setInitialPlant() as PlantCardProps,
};

/**
 * @description Redux slice for the selected plant
 */
export const selectedPlantSlice = createSlice({
  name: 'selectedPlant',
  initialState,
  reducers: {
    setSelectedPlant: (state, action) => {
      state.selectedPlant = action.payload;
    },
  },
});

export const { setSelectedPlant } = selectedPlantSlice.actions;

export default selectedPlantSlice.reducer;