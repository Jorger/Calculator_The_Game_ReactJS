import { Howl } from "howler";

//Exporta el sprite de sonidos, con la posición en que se encuentra cada uno...
export default new Howl({
  src: ["sound.mp3"],
  sprite: {
    click: [0, 310],
    lose: [330, 1500],
    winner: [1500, 2500]
  }
});
