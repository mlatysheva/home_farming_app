import axios from "axios";
import { objectToArray } from "../../utils/objectToArray";

/**
 * @description Fetch the plants data from the external API and convert it into an array of objects
 * @returns Promise with an array of {PlantCardProps} objects 
 */
export const fetchPlants = () => {
  const fetching = async () => {
    const response = await axios.get("http://dev.api.agrilution.com/plantData.json");
    const plantData = objectToArray(response.data);
    return plantData;
  }
  return fetching();
};