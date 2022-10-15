import { useNavigate } from "react-router-dom";
import { setSelectedPlant } from "../features/selectedPlantSlice";
import { useAppDispatch } from "../shared/store/hooks";
import { PlantCardProps } from "../types";
import { constants } from "../utils/constants";
import { Tags } from "./Tags";

/**
 * @description: PlantCard component renders a single plant card
 * @param {PlantCardProps} object
 * @returns {JSX.Element}
 */
export const PlantCard = (props: PlantCardProps) =>{

  const navigate = useNavigate();
  const formattedTags = props.tags.join(", ");
  const dispatch = useAppDispatch();

  /**
   * @description: Set the selected plant to the Redux store, navigate to the selected plant page and set the id to LS
   */
  const handlePlant = () => {
    navigate(`/${constants.baseUrl}/plants/${props.id}`);
    dispatch(setSelectedPlant(props));
    localStorage.setItem("selectedPlant", JSON.stringify(props.id));
  }
  
  return (
    <div
      className="card plant-card"
      onClick={() => handlePlant()}
    >
      <h3 className="plant-title">{props.title}</h3>
      <img
        className="plant-image"
        src={props.title == "Ro­maine Let­tuce" ? props.images[1] : props.images[0]}
        alt="photo of the plant" />
      <div className="plant-price">Price: €{props.price}</div>
      <div className="plant-tags">Tags: {formattedTags}</div>
      <button
        className="plant-card-link"
        onClick={() => handlePlant()}
      >
        More...
      </button>
    </div>
  );
}
