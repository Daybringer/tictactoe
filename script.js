"use strict";

let round = 1;
let win = false;

let playerColors = {
  pink: "#ff1053",
  pinkOff: "#FF638F",
  yellow: "#e7e247",
  blue: "#54defd"
}

let settings = {
  mainColor: `${playerColors.pink}`,
  secondColor: `${playerColors.yellow}`,
  gamePlan: `3`
}


const gamePlan = gamePlanGen(+(settings.gamePlan));
htmlSquareGen(3);

// Default state of 
options_click("left_b", "right_b");

// generating array of game tiles
function gamePlanGen(sizeOfGame) {
  let gameArray = []
  for (let x = 0; x < sizeOfGame; x++) {
    gameArray.push([]);
    for (let y = 0; y < sizeOfGame; y++) {
      gameArray[x].push(0);
    }
  }
  return gameArray;
}

// Dynamicaly generating html divs for game plan
function htmlSquareGen(sizeOfGame) {
  // removing old square grid
  Array.from(document.getElementsByClassName("square")).forEach((curr) => {
    document.getElementsByClassName("game")[0].removeChild(curr);
  });
  // creating new square grid
  for (let x = 0; x < sizeOfGame; x++) {
    for (let y = 0; x < sizeOfGame; y++) {
      let newSquare = document.createElement("div");
      newSquare.className = "square";
      newSquare.id = `${x}${y}`;
      newSquare.onclick = `game_click('${newSquare.id}')`;
      document.getElementsByClassName("game")[0].appendChild(newSquare);
    }
  }
}

// Triggered by clicking on game plan
function game_click(id) {
  if (RGBToHex(window.getComputedStyle(document.getElementById(id)).getPropertyValue("background-color")) === "#e8eddf" && !win) {

    document.getElementById(id).style.backgroundColor = (round % 2 === 1) ? settings.mainColor : settings.secondColor;
    document.getElementById(id).style.cursor = "default";
    gamePlan[Number(id.charAt(0))][Number(id.charAt(1))] = (round % 2 === 1) ? "X" : "O";
    round++;
    win_check();
  } else {

  }
}

// Checking state of rows and columns -> win condition
function win_check() {
  var whiteCounter = 0;
  for (let x = 0; x < gamePlan.length; x++) {

    var xCounterH = 0;
    var oCounterH = 0;
    var xCounterV = 0;
    var oCounterV = 0;
    var xCounterDR = 0;
    var oCounterDR = 0;
    var xCounterDL = 0;
    var oCounterDL = 0;

    for (let y = 0; y < gamePlan[x].length; y++) {

      // Horizotal check + Empty squares check
      if (gamePlan[x][y] === "X") {
        xCounterH++;
      } else if (gamePlan[x][y] === "O") {
        oCounterH++;
      }
      if (gamePlan[x][y] === 0) {
        whiteCounter++;
      }

      // Vertical check
      if (gamePlan[y][x] === "X") {
        xCounterV++;
      } else if (gamePlan[y][x] === "O") {
        oCounterV++;
      }

      if ((x + y) < gamePlan.length) {
        // Right diagonal check
        if (y <= gamePlan[x + y].length) {

          if (gamePlan[x + y][y] === "O") {
            oCounterDR++;
          } else if (gamePlan[x + y][y] === "X") {
            xCounterDR++;
          }
        }

        // Left diagonal check
        if (y <= gamePlan[x + y].length) {
          if (gamePlan[x + y][gamePlan[x + y].length - 1 - y] === "O") {
            oCounterDL++;
          } else if (gamePlan[x + y][gamePlan[x + y].length - 1 - y] === "X") {
            xCounterDL++;
          }
        }

      }

      // Win condition check
      if (xCounterV >= 3 || xCounterH >= 3 || xCounterDR >= 3 || xCounterDL >= 3) {
        won("playerOne");
        return true;
      } else if (oCounterV >= 3 || oCounterH >= 3 || oCounterDR >= 3 || oCounterDL >= 3) {
        won("playerTwo");
        return true;
      }
    }
  }
  if (whiteCounter === 0) {
    won("tie");
  }

  function won(player) {
    console.log((round % 2 === 0) ? settings.mainColor : settings.secondColor);
    console.log((player === "tie") ? "Remíza!" : (player === "playerOne") ? "Růžový hráč vyhrál!" : "Žlutý hráč vyhrál!");
    win = true;
    // let cursorObj = document.getElementsByClassName("square");

    // for (let x = 0; x < cursorObj.length; x++) {
    //   cursorObj[x].style.cursor = "default";
    // }
  }


}



// Options buttons SHOW/HIDE
function options_click(onID, offID) {
  // document.getElementById(onID).style.backgroundColor = "#e8eddf";
  // document.getElementById(offID).style.backgroundColor = "#ff1053";
  // document.getElementById(onID).style.color = "#ff1053";
  // document.getElementById(offID).style.color = "#e8eddf";
  if (onID === "left_b" || onID === "left_b2") {
    document.getElementById("info").style.display = "block";
    document.getElementById("settings").style.display = "none";
  } else if (onID === "right_b" || onID === "right_b2") {
    document.getElementById("settings").style.display = "block";
    document.getElementById("info").style.display = "none";
  }
}

function colorClick(colorDuo) {

}


function gameSizeClick(gameSizeInt) {
  if (gameSizeInt === 3) {
    document.getElementById("3x3").style.boxShadow = "inset 0px 0px 0px 10px #ff1053";
    document.getElementById("15x15").style.boxShadow = "none";
  } else if (gameSizeInt === 15) {
    document.getElementById("15x15").style.boxShadow = "inset 0px 0px 0px 10px #ff1053";
    document.getElementById("3x3").style.boxShadow = "none";
  } else {
    throw "WTF";
  }
}

function optionsFetch() {

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

// JQUERRY SHIT
var cw = $('.options').width();
$('.options').css({ 'height': cw + 'px' });