const buttonOptions = [
  "resetlevel",
  "help",
  "menu",
  "nextlevel",
  "changelevel",
  "continuegame",
  "code",
  "twitter",
  "page",
  "solvelevel"
];

export const isAButtonOption = typeButton => {
  let isOption = false;
  for (let option of buttonOptions) {
    if (option === typeButton) {
      isOption = true;
      break;
    }
  }
  return isOption;
};

//Adiciona un cero al inicio de un número si éste es menor que 10...
export const addInitialZero = value => (+value <= 9 ? `0${value}` : value);

//Para saber si tiene un signo menos el string...
export const haveMinusSign = value => ({
  isNegative: value[0] === "-",
  finalNumber: value[0] === "-" ? value.substr(1, value.length) : value
});

//Convierte la psoción de una matriz (fila, columna), en un valor entero de 0 - 8...
export const getPositionMatrix = position => {
  const coordinates = position.split("_");
  return +coordinates[0] * 3 + +coordinates[1];
};
