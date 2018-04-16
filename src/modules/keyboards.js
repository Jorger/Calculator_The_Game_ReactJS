export default () => ({
  game: [
    [
      {
        color: "lightgreen",
        type: "solvelevel",
        txt: "Solve"
      },
      null,
      {
        color: "darkred",
        type: "resetlevel",
        txt: "CLR"
      }
    ],
    [null, null, null],
    [
      {
        color: "lightblue",
        type: "menu",
        txt: "Menu"
      },
      null,
      null
    ]
  ],
  menu: [
    [
      {
        type: "code",
        txt: "Code",
        params: { url: "" }
      },
      {
        type: "page",
        txt: "About",
        params: { url: "" }
      },
      {
        color: "lightorange",
        type: "twitter",
        txt: "@ostjh"
      }
    ],
    [
      {
        color: "lightblue",
        type: "changelevel",
        params: { value: -1 },
        txt: "-"
      },
      {
        color: "darkblue",
        type: "showlevel",
        txt: "0"
      },
      {
        color: "lightblue",
        type: "changelevel",
        params: { value: 1 },
        txt: "+"
      }
    ],
    [
      {
        color: "darkred",
        type: "continuegame",
        txt: "Go!"
      },
      null,
      null
    ]
  ]
});
