import axios from "axios";
import { objectToArray } from "../utils/objectToArray";

/**
 * @description Fetch the plants data from the external API and convert it into an array of objects
 * @returns Promise with an array of {PlantCardProps} objects 
 */
export const fetchPlants = () => {
  const fetching = async () => {
    const response = await axios.get("https://github.com/mlatysheva/home_farming_app_api/blob/main/data.json");
    const plantData = objectToArray(response.data);
    return plantData;
  }
  return fetching();
};