import safeEval from "safe-eval";
import { haveMinusSign } from "./utils";
/*
Retornará
  * Un error.
  * Si cambió el estado.
  * El nuevo estado...
*/

//Objeto que realiza las operaciones de los bototes...
export default {
  operation(value, params = { value: 0, operator: "" }) {
    const returnData = {
      error: false,
      changeState: true,
      newState: ""
    };
    try {
      returnData.newState = safeEval(
        `${value}${params.operator}${params.value}`
      );
    } catch (e) {
      returnData.error = true;
    }
    return returnData;
  },
  deletenumber: value => {
    //Primero saber si tiene signo el valor...
    return {
      error: false,
      changeState: true,
      newState:
        value[0] !== "-"
          ? +value === 0 || value.length === 1
            ? "0"
            : value.substr(0, value.length - 1)
          : value.substr(0, value.length - 1) + (value.length === 2 ? "0" : "")
    };
  },
  concatenate(value, params = { value: 0 }) {
    //Primero saber si la base es 0, por lo tanto no se encadena...
    return {
      error: false,
      changeState: true,
      newState: +value === 0 ? params.value : `${value}${params.value}`
    };
  },
  changenumber: (value, params) => {
    const returnData = {
      error: false,
      changeState: true,
      newState: ""
    };
    const { isNegative, finalNumber } = haveMinusSign(value);
    //Reemplazar el valor y además comprobar si ha cambiado...
    const numReplace = finalNumber.replace(
      new RegExp(params.numbersearch, "g"),
      params.numberchange
    );
    if (+numReplace !== +finalNumber) {
      returnData.newState = +numReplace * (isNegative ? -1 : 1);
    } else {
      returnData.changeState = false;
    }
    return returnData;
  },
  pownumber: (value, params) => {
    return {
      error: false,
      changeState: true,
      newState: Math.pow(+value, params.exponent)
    };
  },
  changesymbol: value => {
    return {
      error: false,
      changeState: true,
      newState: +value * -1
    };
  },
  reversenumber: value => {
    //Primero saber si tiene el signo menos...
    const { isNegative, finalNumber } = haveMinusSign(value);
    return {
      error: false,
      changeState: true,
      newState:
        +finalNumber
          .split("")
          .reverse()
          .join("") * (isNegative ? -1 : 1)
    };
  },
  sumnumbers: value => {
    const { isNegative, finalNumber } = haveMinusSign(value);
    return {
      error: false,
      changeState: true,
      newState:
        finalNumber
          .split("")
          .reduce((previous, actual) => +previous + +actual) *
        (isNegative ? -1 : 1)
    };
  },
  shiftnumber: (value, params = { direction: "" }) => {
    const returnData = {
      error: false,
      changeState: true,
      newState: ""
    };
    //Primero saber si el valor tiene un valor negativo...
    const { isNegative, finalNumber } = haveMinusSign(value);
    //Saber si el tamaño del string permite el cambio...
    if (finalNumber.length >= 2) {
      try {
        returnData.newState =
          +(params.direction === "left-right"
            ? `${finalNumber.substr(1, finalNumber.length - 1)}${
                finalNumber[0]
              }`
            : `${finalNumber[finalNumber.length - 1]}${finalNumber.substr(
                0,
                finalNumber.length - 1
              )}`) * (isNegative ? -1 : 1);
      } catch (e) {
        returnData.error = true;
      }
    } else {
      returnData.changeState = false;
    }
    return returnData;
  },
  mirronumber: value => {
    //Saber si tiene un valor negativo...
    const returnData = {
      error: false,
      changeState: true,
      newState: ""
    };
    const { isNegative, finalNumber } = haveMinusSign(value);
    if (finalNumber.length >= 1) {
      returnData.newState =
        +`${finalNumber}${finalNumber
          .split("")
          .reverse()
          .join("")}` * (isNegative ? -1 : 1);
    } else {
      returnData.changeState = false;
    }
    return returnData;
  }
};
