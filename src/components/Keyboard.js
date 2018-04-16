import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import "../styles/keyboard.css";

const Keyboard = ({ keyboard, resolveWorld, handlePressButton, disabled }) => (
  <div className="lcd_keyboard">
    {keyboard.map((value, row) =>
      value.map((element, column) => (
        <Button
          key={`${row}_${column}`}
          options={element}
          position={`${row}_${column}`}
          coordinates={{
            left: `${32 * column + 4}%`,
            top: `${30 * row + 10}%`
          }}
          resolveWorld={resolveWorld}
          handlePressButton={handlePressButton}
          disabled={disabled}
        />
      ))
    )}
  </div>
);

Keyboard.prototype = {
  keyboard: PropTypes.array,
  resolveWorld: PropTypes.object,
  handlePressButton: PropTypes.func,
  disabled: PropTypes.bool
};

export default Keyboard;
