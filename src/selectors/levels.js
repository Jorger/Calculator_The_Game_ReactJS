import baseKeyboards from "../modules/keyboards";
//Falta poner el orden de la respuesta...
let levels = [];

//Cargar los niveles a través de un archivo .json, además valores de configuración como las urls de los créditos...
//Se consume el valor almacenado en localStorage del nivel en que está el usuario...
export const loadLevels = callback => {
  fetch("worlds.json")
    .then(r => r.json())
    .then(json => {
      levels = json.worlds;
      const level = +localStorage.getItem("levelGame") || 1;
      callback({ level, urls: json.urls });
    });
};

//Indica el número de niveles existentes...
export const maxLevels = () => levels.length;

//Genera el teclado que se mostrará, dependiendo del tipo...
export const getKeyboard = (level, type = "game") => {
  let screen = { lcd: "PAUSE" };
  let solution = [];
  //Traer el tipo de teclado...
  const keyboard = baseKeyboards()[type];
  if (type === "game") {
    screen = levels[level - 1].screen;
    solution = levels[level - 1].solution;
    for (let button in levels[level - 1].buttons) {
      const indexMatrix = button.split("_");
      keyboard[+indexMatrix[0]][+indexMatrix[1]] =
        levels[level - 1].buttons[button];
    }
  } else {
    //Cargar el nivel actual...
    keyboard[1][1].txt = String(level);
  }
  return { screen, keyboard, solution };
};
