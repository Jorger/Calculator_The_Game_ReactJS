import React from "react";
import PropTypes from "prop-types";
import Arrow from "./Arrow";
import { getPositionMatrix } from "../modules/utils";
import "../styles/button.css";
const Button = ({
  options,
  position,
  coordinates,
  resolveWorld,
  handlePressButton,
  disabled
}) => {
  const showArrow =
    resolveWorld.modeResolve &&
    getPositionMatrix(position) === resolveWorld.orden;
  return (
    <div
      className="space_button"
      style={{ left: coordinates.left, top: coordinates.top }}
    >
      {options && (
        <div>
          {showArrow && <Arrow />}
          <button
            disabled={
              options.type !== "menu" &&
              options.type !== "resetlevel" &&
              options.type !== "nextlevel"
                ? options.type === "showlevel" ? true : disabled
                : false
            }
            className={`button ${
              options.color ? "button__" + options.color : ""
            }`}
            onClick={() => handlePressButton(options, position)}
          >
            {options.txt}
          </button>
        </div>
      )}
    </div>
  );
};

Button.prototype = {
  options: PropTypes.object,
  position: PropTypes.string,
  coordinates: PropTypes.object,
  resolveWorld: PropTypes.object,
  handlePressButton: PropTypes.func,
  disabled: PropTypes.bool
};

export default Button;
