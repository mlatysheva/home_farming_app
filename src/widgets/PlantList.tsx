import { useEffect } from "react";
import { PlantCard } from "./PlantCard";
import { useAppDispatch, useAppSelector } from "../shared/store/hooks";
import { getPlants } from "../features/plantsSlice";
import { PlantCardProps } from "../shared/types";

interface PlantListProps {
  plants: PlantCardProps[];
};

export const PlantList = (props: PlantListProps) => {

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
  
  if (props.plants.length > 0) {
    return (
      <div className="plants-container">
        {props.plants.map((item: any) => {
          return <PlantCard key={item.id} {...item} />;
        })}    
      </div>
    )
  } else {
    return null;
  }
};
