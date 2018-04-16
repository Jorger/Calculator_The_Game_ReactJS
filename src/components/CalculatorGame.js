import React, { Component } from "react";
import LCD from "./LCD";
import Keyboard from "./Keyboard";
import { getKeyboard, loadLevels, maxLevels } from "../selectors/levels";
import operations from "../modules/operations";
import sounds from "../modules/sounds";
import { isAButtonOption, getPositionMatrix } from "../modules/utils";
import "../styles/calculatorgame.css";

//Las urls que tendrán los botones de créditos...
let urlsButtons = {};

//Clase principal del juego...
class CalculatorGame extends Component {
  state = {
    numLevel: 0,
    typeKeyboard: "",
    error: false,
    finishLevel: false,
    outofmoves: false,
    modeResolve: false,
    ordenResolve: 0,
    screen: {
      level: 0,
      face: "",
      moves: 0,
      goal: "0",
      lcd: "LOAD..."
    },
    keyboard: [],
    solution: []
  };

  //Carga un nivel...
  loadlevel = (level, type = "game") => {
    if (type === "game") {
      localStorage.setItem("levelGame", String(level));
    }
    const newLevel = getKeyboard(level, type);
    this.setState(() => ({
      numLevel: level,
      typeKeyboard: type,
      error: false,
      finishLevel: false,
      outofmoves: false,
      modeResolve: false,
      ordenResolve: 0,
      screen: {
        face: "happy",
        level,
        ...newLevel.screen
      },
      keyboard: newLevel.keyboard,
      solution: newLevel.solution
    }));
  };

  handlePressButton = (button, position) => {
    sounds.play("click");
    const buttonOption = isAButtonOption(button.type);
    if (!buttonOption) {
      //Saber si está en modo de resolver el mundo...
      const acceptAction = this.state.modeResolve
        ? getPositionMatrix(position) ===
          this.state.solution[this.state.ordenResolve]
        : true;
      if (acceptAction) {
        const { error, changeState, newState } = operations[button.type](
          String(this.state.screen.lcd),
          button.params || {}
        );
        if (!error) {
          if (changeState) {
            //Saber si el usuario ha terminado el nivel
            //y además si se ha quedado sin movimiento...
            const prevState = { ...this.state };
            if (+newState === +this.state.screen.goal) {
              sounds.play("winner");
              prevState.finishLevel = true;
              //Acá podría cambiar el valor del teclado...
              prevState.keyboard[0][2] = {
                color: "darkgreen",
                type: "nextlevel",
                txt: "OK"
              };
              prevState.keyboard[2][0] = prevState.keyboard[0][0] = null;
            } else if (this.state.screen.moves - 1 <= 0) {
              prevState.outofmoves = true;
              prevState.screen.face = "sad";
              sounds.play("lose");
              prevState.keyboard[0][0] = null;
            }
            //Si está en modo resolver se aumentará el orden del siguiente resultado...
            if (this.state.modeResolve) {
              prevState.ordenResolve++;
            }
            prevState.screen = {
              ...prevState.screen,
              lcd: String(newState),
              moves: this.state.screen.moves - 1
            };
            this.setState(() => prevState);
          }
        } else {
          this.setState(() => ({ error: true, screen: { lcd: "ERROR" } }));
        }
      }
    } else {
      if (button.type === "resetlevel") {
        this.loadlevel(this.state.numLevel);
      } else if (button.type === "nextlevel") {
        const numLevel =
          this.state.numLevel + 1 <= maxLevels() ? this.state.numLevel + 1 : 1;
        this.loadlevel(numLevel);
      } else if (button.type === "menu") {
        this.loadlevel(this.state.numLevel, "menu");
      } else if (button.type === "changelevel") {
        //Traer la cantidad máxima de niveles que existen...
        const maxLevelsExist = maxLevels();
        //Si el nivel es cero, establece el máximo nivel, si el nivel es mayor al existe lo devielve a 1...
        const numLevel =
          this.state.numLevel + button.params.value <= 0
            ? maxLevelsExist
            : this.state.numLevel + button.params.value > maxLevelsExist
              ? 1
              : this.state.numLevel + button.params.value;
        const keyboardBase = [...this.state.keyboard];
        keyboardBase[1][1].txt = String(numLevel);
        this.setState(() => ({
          numLevel,
          keyboard: keyboardBase
        }));
      } else if (button.type === "continuegame") {
        this.loadlevel(this.state.numLevel);
      } else if (
        button.type === "code" ||
        button.type === "twitter" ||
        button.type === "page"
      ) {
        //Lleva a las url's de los créditos...
        window.open(urlsButtons[button.type], "_blank");
      } else if (button.type === "solvelevel") {
        //Se debe quitar los botones que no se harán uso, como es el caso de:
        /*
        Botón de resolver...
        Botón de limpiar...
        Botón de menú...
        */
        //Se reinicia el nivel...
        this.loadlevel(this.state.numLevel);
        //Se limpian los elementos que no se necesitan...
        const keyboardBase = [...this.state.keyboard];
        keyboardBase[0][0] = keyboardBase[0][2] = keyboardBase[2][0] = null;
        //Se debe establecer que se está en modo guiado...
        this.setState(() => ({
          modeResolve: true,
          keyboard: keyboardBase
        }));
      }
    }
  };

  componentDidMount() {
    loadLevels(data => {
      urlsButtons = data.urls;
      this.loadlevel(data.level);
    });
  }

  render() {
    const disabled =
      this.state.error || this.state.finishLevel || this.state.outofmoves;
    return (
      <div className="flex-container">
        <div className="container">
          <div className="frame_game">
            <LCD
              {...this.state.screen}
              typeKeyboard={this.state.typeKeyboard}
            />
            <Keyboard
              keyboard={this.state.keyboard}
              resolveWorld={{
                modeResolve: this.state.modeResolve,
                orden: this.state.solution[this.state.ordenResolve]
              }}
              disabled={disabled}
              handlePressButton={this.handlePressButton}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CalculatorGame;
