import { useEffect, useState } from "react";
import { setBlueLight, setFarredLight, setRedLight, setWhiteLigtht } from "../features/lightsSlice";
import { useAppDispatch, useAppSelector } from "../shared/store/hooks";
import "./LightSettings.scss";
import { constants } from "../utils/constants";

const colorDescriptions = {
  blue: "Ensures healthy roots, strong stems, and healthy - bigger- leafs.",
  white: "Minor impact on plant growth or health. Effects production of essential oil and thus taste of the greens(plants).",
  red: "Essential for flowering or very weak stage in plants.",
  farred: "Impacts the height grow of the plant. Plant is potentially getting bigger with weaker stems when far-red value is higher.",
}

interface LightSettingsProps {
  color: string,
  range: number[];
}

/**
 * @description LightSettings component is used to display and change the light settings for a given light of a specific plant.
 * @param {LightSettingProps} object 
 * @returns {JSX.Element}
 */
export const LightSettings = (props: LightSettingsProps) => {

  const description = (colorDescriptions as any)[props.color];
  const [value, setValue] = useState(props.range[0]);
  const dispatch = useAppDispatch();
  const currentLightSettings = useAppSelector((state) => state.lights);

  /**
   * @description dispatch the initial light value to the Redux store
   */
  useEffect(() => {
    switch (props.color) {
      case "blue":
        dispatch(setBlueLight(value));
        break;
      case "red":
        dispatch(setRedLight(value));
        break;
      case "farred":
        dispatch(setFarredLight(value));
        break;
      case "white":
        dispatch(setWhiteLigtht(value));
        break;
      default:
        break;
    }
  }, []);

  /**
   * @description: dispatch the correct light-setting action to the Redux store from the user input
   */
  const fireRequiredLightDispatch = () => {
    switch (props.color) {
      case "blue": dispatch(setBlueLight(value)); break;
      case "red": dispatch(setRedLight(value)); break;
      case "farred": dispatch(setFarredLight(value)); break;
      case "white": dispatch(setWhiteLigtht(value)); break;
    } 
  }

  /**
   * @description: check if the current light setting is within the permitted maximum light threshold
   * @param permittedMaximum set to 300 in our case
   * @returns Boolean
   */
  const checkIfMaximumNotExceeded = (permittedMaximum = constants.MAXIMUM_LIGHT_VALUE) => {
    if (currentLightSettings.lights.blue 
      && currentLightSettings.lights.red
      && currentLightSettings.lights.farred 
      && currentLightSettings.lights.white) {
      const currentLightValue = currentLightSettings.lights.blue 
        + currentLightSettings.lights.red 
        + currentLightSettings.lights.farred 
        + currentLightSettings.lights.white;
      console.log(currentLightValue);
      console.log(currentLightValue < permittedMaximum);
      return currentLightValue < permittedMaximum;
    } else {
      return true;
    }
  }

  return(
    <div className="light-settings__item">
      <h3 className="light-settings__item__title">{props.color.toUpperCase()}</h3>
      <div className="light-settings__item__description">{description}</div>
      <div className="light-settings__item__description">Available range: {props.range[0]} .. {props.range[1]}</div>
      <div className="input-fields">
        <input
          type="range"
          min={props.range[0]}
          max={props.range[1]}
          value={value}
          onChange={(e) => {
            if (checkIfMaximumNotExceeded()) {
              setValue(parseInt(e.target.value))
              fireRequiredLightDispatch();  
            } else if (parseInt(e.target.value) < value) {
              setValue(parseInt(e.target.value))
              fireRequiredLightDispatch();  
            } else {
              alert("Maximum light value exceeded. Please decrease the value of another light before increasing this one.");
            }        
          }}
          onMouseUp={(e) => {
            fireRequiredLightDispatch();  
          }}
        />
        <input
          type="number"
          min={value}
          max={props.range[1]}
          value={value}
          onChange={(e) => {
            setValue(parseInt(e.target.value));
            fireRequiredLightDispatch();
          }}
        />
      </div>
    </div>
  )
}
