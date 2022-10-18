import { useNavigate } from 'react-router-dom';
import { LightSettings } from "../widgets/LightSettings";
import { useAppDispatch, useAppSelector } from '../shared/store/hooks';
import { useEffect } from "react";
import { setBlueLight, setFarredLight, setLights, setRedLight, setWhiteLigtht } from "../features/lightsSlice";
import { TagsList } from "../widgets/TagsList";
import { getFilteredPlants } from "../features/filteredPlantsSlice";
import { PlantList } from "../widgets/PlantList";
import { constants } from "../shared/constants";

export const SelectedPlantPage = () => {
  const navigate = useNavigate();
  const selectedPlantProps = useAppSelector((state) => state.selectedPlant.selectedPlant);
  const selectedTag = useAppSelector((state) => state.selectedTag.selectedTag);
  const filteredPlants = useAppSelector((state) => state.filteredPlants.filteredPlants);
  const lightSettings = useAppSelector((state) => state.lights.lights);
  const errorMessage = `Maximum permitted LED value of ${constants.MAXIMUM_LIGHT_VALUE} is exceeded. Reduce the value of one or more of the light settings.`;

  const dispatch = useAppDispatch();

  useEffect (() => {
    dispatch(setBlueLight(selectedPlantProps.light_settings.blue[0]));
    dispatch(setRedLight(selectedPlantProps.light_settings.red[0]));
    dispatch(setFarredLight(selectedPlantProps.light_settings.farred[0]));
    dispatch(setWhiteLigtht(selectedPlantProps.light_settings.white[0]));
    
    if (selectedTag) {
      dispatch(getFilteredPlants(selectedTag));
    }
  }, 
  [dispatch,
      selectedPlantProps.light_settings.blue,
      selectedPlantProps.light_settings.farred,
      selectedPlantProps.light_settings.red,
      selectedPlantProps.light_settings.white,
      selectedTag,
  ]);

  /**
   * @description: Get the empty plants array if the user clicks on the 'close' button
   * and the tagged plants section will not be displayed
   */
  const closeTaggedPlants = () => {
    dispatch(getFilteredPlants(''));
  }

  if (selectedPlantProps) {
    return (
      <div className="main selected-plant__page">
        <section className="selected-plant__top-container">     
          <h1 className="title">{selectedPlantProps.title}</h1>
          <div className="plant-details-wrapper">
            <a href={selectedPlantProps.images[0] || ''} target="_blank" rel="noreferrer">
              <img
                className="selected-plant__image"
                src={selectedPlantProps.title == "Ro­maine Let­tuce" ? selectedPlantProps.images[1] : selectedPlantProps.images[0]}
                alt="photo of the plant"
              />
            </a>
            <div className="details-container">              
              <div className="details-field">
                <div className="explanation">Description</div>
                {selectedPlantProps.description}
              </div>
              <TagsList tagsArray={selectedPlantProps.tags} />
              <p className="details-field plant-price">
                Price: € {selectedPlantProps.price}
              </p>
            </div>
          </div>
        </section>
        <section className="tagged-plants__list">
          {(filteredPlants.length > 0) ? <h3 className="tagged-plants__title">Other plants tagged as <span className="explanation">{selectedTag}</span></h3>: null}
          {(filteredPlants.length > 0) ? <PlantList plants={filteredPlants} /> : null}
          {(filteredPlants.length > 0) ?
            <button
            className="tagged-plants__close-button back-button"
            type="button"
            onClick={() => {
              closeTaggedPlants();
            }}
            >
              Close
            </button> : null
          }
        </section>
        <section className="lights-section">  
          <h2 className="light-settings__title">
            Lights Settings
          </h2>
          <div className="details-field">
            <p>In the following section you can set the lights settings for your plant. </p>
            <p className="explanation">Remember that you should not exceed the maximum of 300 LED for all the lights combined.</p>
          </div>
          <div className="light-settings__container">
            <LightSettings color="blue" range={[selectedPlantProps.light_settings.blue[0], selectedPlantProps.light_settings.blue[1]]} />
            <LightSettings color="red" range={[selectedPlantProps.light_settings.red[0], selectedPlantProps.light_settings.red[1]]} />
            <LightSettings color="farred" range={[selectedPlantProps.light_settings.farred[0], selectedPlantProps.light_settings.farred[1]]} />
            <LightSettings color="white" range={[selectedPlantProps.light_settings.white[0], selectedPlantProps.light_settings.white[1]]} />
          </div>
          {lightSettings.error ? <div className="error-message">{errorMessage}</div> : <div className="error-message"></div>}

          
          <button
            className="back-button"
            type="button"
            onClick={() => {
              navigate("/agrilution_app/plants");
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
