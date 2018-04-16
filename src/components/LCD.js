import React from "react";
import PropTypes from "prop-types";
import { addInitialZero } from "../modules/utils";
import "../styles/lcd.css";

const LCD = ({ moves, goal, lcd, level, face, typeKeyboard }) => {
  return (
    <div className="lcd_frame">
      <div className="lcd_housing">
        {typeKeyboard === "game" && (
          <div className="lcd_level_txt">LEVEL: {addInitialZero(level)}</div>
        )}
        <div className="lcd_content">
          <div
            className={`lcd_face ${typeKeyboard !== "game" ? "lcd_pause" : ""}`}
          >
            {typeKeyboard === "game" && <div className={`lcd_face__${face}`} />}
          </div>
          <div
            className={`lcd_option lcd_moves ${
              typeKeyboard !== "game" ? "lcd_pause" : ""
            }`}
          >
            {typeKeyboard === "game" && `MOVES: ${addInitialZero(moves)}`}
          </div>
          <div
            className={`lcd_option lcd_goal ${
              typeKeyboard !== "game" ? "lcd_pause" : ""
            }`}
          >
            {typeKeyboard === "game" && `GOAL: ${goal}`}
          </div>
          <div className="lcd_text">{lcd}</div>
        </div>
      </div>
    </div>
  );
};

LCD.prototype = {
  moves: PropTypes.string,
  goal: PropTypes.number,
  lcd: PropTypes.string,
  level: PropTypes.number,
  face: PropTypes.string,
  typeKeyboard: PropTypes.string
};

export default LCD;
