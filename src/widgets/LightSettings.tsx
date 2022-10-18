import { useEffect, useState } from "react";
import { setBlueLight, setError, setFarredLight, setRedLight, setWhiteLigtht } from "../features/lightsSlice";
import { useAppDispatch, useAppSelector } from "../shared/store/hooks";
import { constants } from "../shared/constants";

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
  const dispatch = useAppDispatch();
  const currentLightSettings = useAppSelector((state) => state.lights.lights);
  const [value, setValue] = useState(props.range[0]);
  let currentColorValue = 0;
  // const [value, setValue] = useState(currentColorValue);
  /**
   * @description dispatch the initial light value to the Redux store
   */
  useEffect(() => {
    switch (props.color) {
      case "blue":
        dispatch(setBlueLight(value));
        currentColorValue = currentLightSettings.blue || 0;
        break;
      case "red":
        dispatch(setRedLight(value));
        currentColorValue = currentLightSettings.red || 0;
        break;
      case "farred":
        dispatch(setFarredLight(value));
        currentColorValue = currentLightSettings.farred || 0;
        break;
      case "white":
        dispatch(setWhiteLigtht(value));
        currentColorValue = currentLightSettings.white || 0;
        break;
      default:
        break;
    }
  });

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
    if (currentLightSettings.blue 
      && currentLightSettings.red
      && currentLightSettings.farred 
      && currentLightSettings.white) {
      const currentLightValue = currentLightSettings.blue 
        + currentLightSettings.red 
        + currentLightSettings.farred 
        + currentLightSettings.white;
      return currentLightValue < permittedMaximum;
    } else {
      return true;
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (checkIfMaximumNotExceeded()) {
      setValue(parseInt(e.target.value))
      fireRequiredLightDispatch();
    } else if (parseInt(e.target.value) < value) {
      dispatch(setError(false));
      setValue(parseInt(e.target.value))
      fireRequiredLightDispatch();  
    } else {
      dispatch(setError(true));
    }      
  }

  /**
   * @description: Style the input range element depending on the given light color
   * @returns {CSS object} 
   */
  const getBackgroundSize = () => {
    let color = props.color;
    switch (color) {
      case "farred":
        color = "darkred";
        break;
      case "white":
        color = "gray";
        break;
    }
    return {
      backgroundSize: `${((value - props.range[0]) * 100) / (props.range[1] - props.range[0])}% 100%`,
      backgroundImage: `linear-gradient(${color}, ${color})`,
    };
  };

  return(
    <div className="light-settings__item">
      <h3 className="light-settings__item__title">{props.color.toUpperCase()}</h3>
      <div className="light-settings__item__description">{description}</div>
      <div className="light-settings__item__description">Available range: {props.range[0]} .. {props.range[1]}</div>
      <div className="light-settings__input-wrapper">
        <div className="input-label min-label">{props.range[0]}</div>
        <input
          type="range"
          min={props.range[0]}
          max={props.range[1]}
          value={value}
          onChange={(e) => {
            handleChange(e);
          }}
          style={getBackgroundSize()}
          // onMouseUp={(e) => {
          //   fireRequiredLightDispatch();  
          // }}
        />
        <div className="input-label current-label">{value}</div>        
      </div>
    </div>
  )
}
