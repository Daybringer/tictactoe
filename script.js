"use strict";

var round = 1;
var win = false;

let playerColors = {
  pink: "#ff1053",
  pinkOff: "#FF638F",
  yellow: "#e7e247",
  blue: "#54defd",
}
const gamePlan = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let playerColorOne = "#ff1053";
let playerColorTwo = "#e7e247";
// Default state
options_click("left_b", "right_b");

// Triggered by clicking on game plan
function game_click(id) {
  if (RGBToHex(window.getComputedStyle(document.getElementById(id)).getPropertyValue("background-color")) === "#e8eddf" && !win) {

    document.getElementById(id).style.backgroundColor = (round % 2 === 1) ? playerColorOne : playerColorTwo;
    document.getElementById(id).style.cursor = "default";
    document.getElementById("draw_player").style.backgroundColor = (round % 2 === 0) ? playerColorOne : playerColorTwo;
    gamePlan[id.charCodeAt(0) - 97][Number(id.charAt(1)) - 1] = (round % 2 === 1) ? "X" : "O";
    round++;
    win_check();
  } else {

  }
}

// Checking state of rows and columns -> win condition
function win_check() {
  let whiteCounter = 0;

  for (let x = 0; x < gamePlan.length; x++) {
    let xCounterH = 0;
    let oCounterH = 0;
    let xCounterV = 0;
    let oCounterV = 0;


    for (let y = 0; y < gamePlan[x].length; y++) {
      if (gamePlan[x][y] === "X") {
        xCounterH++;
      } else if (gamePlan[x][y] === "O") {
        oCounterH++;
      }
      if (xCounterH >= 3) {
        won("playerOne");
      } else if (oCounterH >= 3) {
        won("playerTwo");
      }

      if (gamePlan[y][x] === "X") {
        xCounterV++;
      } else if (gamePlan[y][x] === "O") {
        oCounterV++;
      }
      if (xCounterV >= 3) {
        won("playerOne");
      } else if (oCounterV >= 3) {
        won("playerTwo");
      }
      if (gamePlan[x][y] === 0) {
        whiteCounter++;
      }
    }
  }

  function won(player) {
    document.getElementById("draw_player").style.display = "none";
    document.getElementById("game_state").style.display = "block";
    document.getElementById("again").style.display = "block";

    document.getElementById("game_state_text").style.color = (round % 2 === 0) ? playerColorOne : playerColorTwo;
    document.getElementById("game_state_text").innerHTML = (player === "tie") ? "Remíza!" : (player === "playerOne") ? "Růžový hráč vyhrál!" : "Žlutý hráč vyhrál!";
    win = true;
    let cursorObj = document.getElementsByClassName("square");

    for (let x = 0; x < cursorObj.length; x++) {
      cursorObj[x].style.cursor = "default";
    }

  }

  if (whiteCounter === 0) {
    won("tie");
  }
}

// Options buttons SHOW/HIDE
function options_click(onID, offID) {
  document.getElementById(onID).style.backgroundColor = "#FF638F";
  document.getElementById(offID).style.backgroundColor = "#ff1053";
  if (onID === "left_b") {
    document.getElementById("info").style.display = "block";
    document.getElementById("settings").style.display = "none";
  } else if (onID === "right_b") {
    document.getElementById("settings").style.display = "block";
    document.getElementById("info").style.display = "none";
  }
}

function makeClickable() {

}

function again() {
  location.reload();
}

function makeUnclickable() {

}

// Converting RGB to HEX
function RGBToHex(rgb) {
  // Choose correct separator
  let sep = rgb.indexOf(",") > -1 ? "," : " ";
  // Turn "rgb(r,g,b)" into [r,g,b]
  rgb = rgb.substr(4).split(")")[0].split(sep);

  let r = (+rgb[0]).toString(16),
    g = (+rgb[1]).toString(16),
    b = (+rgb[2]).toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}