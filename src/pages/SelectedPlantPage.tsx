import { useNavigate } from 'react-router-dom';
import { LightSettings } from "../widgets/LightSettings";
import "./SelectedPlantPage.scss";
import { useAppDispatch, useAppSelector } from '../shared/store/hooks';
import { useEffect } from "react";
import { setBlueLight, setFarredLight, setRedLight, setWhiteLigtht } from "../features/lightsSlice";
import { constants } from "../utils/constants";

export const SelectedPlantPage = () => {
  const navigate = useNavigate();
  const selectedPlantProps = useAppSelector((state) => state.selectedPlant.selectedPlant);
  const formattedTags = selectedPlantProps.tags.join(", ");
  const dispatch = useAppDispatch();

  useEffect (() => {
    dispatch(setBlueLight(selectedPlantProps.light_settings.blue[0]));
    dispatch(setRedLight(selectedPlantProps.light_settings.red[0]));
    dispatch(setFarredLight(selectedPlantProps.light_settings.farred[0]));
    dispatch(setWhiteLigtht(selectedPlantProps.light_settings.white[0]));
  }, [dispatch, selectedPlantProps.light_settings.blue, selectedPlantProps.light_settings.farred, selectedPlantProps.light_settings.red, selectedPlantProps.light_settings.white]);

  if (selectedPlantProps) {
    return (
      <div className="main selected-plant-page">
        <section className="selected-plant-top-container">
          <h1 className="title">{selectedPlantProps.title}</h1>
          <div className="plant-details-wrapper">
            <a href={selectedPlantProps.images[0] || ''} target="_blank" rel="noreferrer">
              <img
                className="selected-plant-image"
                src={selectedPlantProps.title == "Ro­maine Let­tuce" ? selectedPlantProps.images[1] : selectedPlantProps.images[0]}
                alt="photo of the plant"
              />
            </a>
            <div className="details-container">              
              <p className="details-field">
                <span className="explanation">Description:&nbsp;</span>
                {selectedPlantProps.description}
              </p>
              <p className="details-field">
                <span className="explanation">Tags:&nbsp;</span>
                {formattedTags}
              </p>
              <p className="details-field plant-price">
                Price: € {selectedPlantProps.price}
              </p>
            </div>
          </div>
        </section>
        <section className="lights-section">  
          <h2 className="light-settings__title">
            Lights Settings
          </h2>
          <div className="light-settings__container">
            <LightSettings color="blue" range={[selectedPlantProps.light_settings.blue[0], selectedPlantProps.light_settings.blue[1]]} />
            <LightSettings color="red" range={[selectedPlantProps.light_settings.red[0], selectedPlantProps.light_settings.red[1]]} />
            <LightSettings color="farred" range={[selectedPlantProps.light_settings.farred[0], selectedPlantProps.light_settings.farred[1]]} />
            <LightSettings color="white" range={[selectedPlantProps.light_settings.white[0], selectedPlantProps.light_settings.white[1]]} />
          </div>
          <button
            className="back-button"
            type="button"
            onClick={() => {
              navigate(`/${constants.baseUrl}/plants`);
            }}
          >
            Back
          </button>
        </section>
      </div>
    );
  } else {
    return null
  }
}
