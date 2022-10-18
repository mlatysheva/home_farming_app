import { useEffect } from "react";
import { getPlants } from "../features/plantsSlice";
import { useAppDispatch, useAppSelector } from "../shared/store/hooks";
import { PlantList } from '../widgets/PlantList';

export const PlantsPage = () => {
  const dispatch = useAppDispatch();

  /**
   * @description: Fetch and place the Plants to the Redux store on component mount
   */
  useEffect(() => {
    dispatch(getPlants());
  }, []);

  /**
   * @description Receive plants data from the Redux store 
   **/ 
  const plants = useAppSelector((state) => state.plants.plants);

  if (plants.length > 0) {
    return (
      <div className="main plants-page">
        <h1>Plants for your home garden</h1>
        <PlantList plants={plants} />    
      </div>
    )
  } else {
    return null;
  }
};
