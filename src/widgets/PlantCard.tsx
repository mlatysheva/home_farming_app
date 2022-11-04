import { useNavigate } from "react-router-dom";
import { setSelectedPlant } from "../features/selectedPlantSlice";
import { constants } from "../shared/constants";
import { useAppDispatch } from "../shared/store/hooks";
import { PlantCardProps } from "../shared/types";

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
    navigate(`/home_farming_app/plants/${props.id}`);
    dispatch(setSelectedPlant(props));
    // window.location.reload();
    window.scrollTo({top: 0, left: 0, behavior: "smooth"});
    localStorage.setItem("selectedPlant", JSON.stringify(props.id));
  }
  
  return (
    <div
      className="card plant-card"
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
