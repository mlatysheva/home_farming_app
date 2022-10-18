import { createSlice, PayloadAction } from "@reduxjs/toolkit"; 
import data from "../data/data.json";
import { PlantCardProps } from "../shared/types";
import { objectToArray } from "../shared/utils/objectToArray";

export interface LigthtsState {
  blue?: number;
  red?: number;
  farred?: number;
  white?: number;
  error?: boolean;
  errorMessage?: string;
}

/**
 * @description Take the initial light settings from JSON file or external API if plant ID is kept in LS, 
 * otherwise takes those for the first plant in the JSON file
 * @returns {LigthtsState} object
 */
 const setInitialLightSettings = () => {

  const initialData = objectToArray(data);
  const plant = localStorage.getItem('selectedPlant');

  if (plant) {
    const plantID = JSON.parse(plant);
    const plantData = initialData.find((plant: PlantCardProps) => plant.id === plantID);
    if (plantData) {
      const lightSettingsFromLS = {
        blue: plantData.light_settings.blue[0] || 0,
        red: plantData.light_settings.red[0] || 0,
        farred: plantData.light_settings.farred[0] || 0,
        white: plantData.light_settings.white[0] || 0,
        error: false,
        errorMessage: '',
      };
      return lightSettingsFromLS;
    }
  } else {
    const firstPlant = initialData[0];
    if (firstPlant) {
      const initialState = {
        blue: firstPlant.light_settings.blue[0] || 0,
        red: firstPlant.light_settings.red[0] || 0,
        farred: firstPlant.light_settings.farred[0] || 0,
        white: firstPlant.light_settings.white[0] || 0,
        error: false,
        errorMessage: '',
      };  
      return initialState;
    } else {
      return {
        blue: 0,
        red: 0,
        farred: 0,
        white: 0,
        error: false,
        errorMessage: '',
      };
    }
  }
};

const initialState = {
  lights: setInitialLightSettings() as LigthtsState,
};

/**
 * @description Redux slice for the selected plant
 */
export const lightsSlice = createSlice({
  name: "lights",
  initialState,
  reducers: {
    setLights: (state, action: PayloadAction<LigthtsState>) => {
      state.lights = {...action.payload};
      
      console.dir(`in setLights state is`);
      console.dir(state.lights);
    },
    setBlueLight: (state, action: PayloadAction<number>) => {
      state.lights.blue = action.payload;
    },
    setRedLight: (state, action: PayloadAction<number>) => {
      state.lights.red = action.payload;
    },
    setFarredLight: (state, action: PayloadAction<number>) => {
      state.lights.farred = action.payload;
    },
    setWhiteLigtht: (state, action: PayloadAction<number>) => {
      state.lights.white = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.lights.error = action.payload;
    }
  },
});

export const { setLights, setBlueLight, setRedLight, setFarredLight, setWhiteLigtht, setError } = lightsSlice.actions;

export default lightsSlice.reducer;
