"use strict";

let round = 1;
let win = false;

let playerColors = {
  pink: "#ff1053",
  pinkOff: "#FF638F",
  yellow: "#e7e247",
  blue: "#54defd",
  grey: "#494947",
  pearl: "#e8eddf"
}

let settings = {
  mainColor: `${playerColors.pink}`,
  secondColor: `${playerColors.yellow}`,
  gamePlan: `3`
}

const tempSettings = { ...settings };

let gamePlan = gamePlanGen(+(settings.gamePlan));
let gamePlanRDiagonal = diagGamePlanGen(+(settings.gamePlan));
let gamePlanLDiagonal = diagGamePlanGen(+(settings.gamePlan));
htmlSquareGen(3);

// Default state of 
options_click("right_b", "left_b");

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
// generetaing diagonal gamePlan ==> unlike normal not equal arrays
function diagGamePlanGen(sizeOfGame) {
  let tempArr = [];
  for (let x = 0; x < (sizeOfGame * 2 - 1); x++) {
    tempArr.push([])
  }
  for (let x = 0; x < sizeOfGame; x++) {
    for (let y = 0; y < x + 1; y++) {
      tempArr[x].push(0);
    }
  }

  let temp = sizeOfGame;
  for (let x = sizeOfGame - 1; x > 0; x--) {
    for (let y = 0; y < x; y++) {
      tempArr[temp].push(0);
    }
    temp++;
  }
  return tempArr;
}
// Dynamicaly generating html divs for game plan
function htmlSquareGen(sizeOfGame) {
  // removing old square grid
  Array.from(document.getElementsByClassName("square")).forEach((curr) => {
    document.getElementsByClassName("game")[0].removeChild(curr);
  });

  // creating new square grid
  for (let x = 0; x < sizeOfGame; x++) {
    for (let y = 0; y < sizeOfGame; y++) {
      let newSquare = document.createElement("div");
      newSquare.className = "square";
      newSquare.id = `${x}:${y}`;
      newSquare.onclick = () => game_click(newSquare.id);
      newSquare.style.gridArea = `${x + 1}/${y + 1}`;
      document.getElementsByClassName("game")[0].appendChild(newSquare);
    }
  }

}

// Triggered by clicking on game plan
function game_click(id) {
  if (RGBToHex(window.getComputedStyle(document.getElementById(id)).getPropertyValue("background-color")) === "#e8eddf" && !win) {

    document.getElementById(id).style.backgroundColor = (round % 2 === 1) ? settings.mainColor : settings.secondColor;
    document.getElementById(id).style.cursor = "default";
    let xGrid = Number(id.split(":")[0]);
    let yGrid = Number(id.split(":")[1])
    gamePlan[xGrid][yGrid] = (round % 2 === 1) ? "X" : "O";

    let xPosition = 0;
    let yPosition = (xGrid + yGrid < settings.gamePlan) ? yGrid : settings.gamePlan - (xGrid + yGrid) + yGrid - 1;

    gamePlanLDiagonal[xGrid + yGrid][yPosition] = (round % 2 === 1) ? "X" : "O";
    // gamePlanLDiagonal[Number(id.split(":")[0]) + Number(id.split(":")[1])][xPosition] = (round % 2 === 1) ? "X" : "O";
    round++;
    console.log(gamePlanLDiagonal);
    console.log(yPosition);
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
    var xCounterBDL = 0;
    var oCounterBDL = 0;


    for (let y = 0; y < gamePlan[x].length; y++) {

      // Horizotal check + Empty squares check
      if (gamePlan[x][y] === "X") {
        oCounterH = 0;
        xCounterH++;
      } else if (gamePlan[x][y] === "O") {
        oCounterH++;
        xCounterH = 0;
      }
      if (gamePlan[x][y] === 0) {
        whiteCounter++;
      }

      // Vertical check
      if (gamePlan[y][x] === "X") {
        xCounterV++;
        oCounterV = 0;
      } else if (gamePlan[y][x] === "O") {
        oCounterV++;
        xCounterV = 0;
      }

      // Win condition check
      if (gamePlan.length === 3) {
        if (xCounterV >= 3 || xCounterH >= 3) {
          won("playerOne");
          return true;
        } else if (oCounterV >= 3 || oCounterH >= 3) {
          won("playerTwo");
          return true;
        }
      } else if (gamePlan.length === 15) {
        if (xCounterV >= 5 || xCounterH >= 5) {
          won("playerOne");
          return true;
        } else if (oCounterV >= 5 || oCounterH >= 5) {
          won("playerTwo");
          return true;
        }
      }
    }
  }

  // Diagonal check
  for (let x = 0; x < settings.gamePlan; x++) {
    for (let y = 0; y < x + 1; y++) {

      if (gamePlanLDiagonal[x][y] === "X") {
        xCounterDL++;
        oCounterDL = 0;
      } else if (gamePlanLDiagonal[x][y] === "O") {
        oCounterDL++;
        xCounterDL = 0;
      }

      if (gamePlanLDiagonal[gamePlanLDiagonal.length - x - 1][y] === "X") {
        xCounterBDL++;
        oCounterBDL = 0;
      } else if (gamePlanLDiagonal[gamePlanLDiagonal.length - x - 1][y] === "O") {
        oCounterBDL++;
        xCounterBDL = 0;
      }
    }
    if (gamePlan.length === 3) {
      if (xCounterDR >= 3 || xCounterDL >= 3 || xCounterBDL >= 3) {
        won("playerOne");
        return true;
      } else if (oCounterDR >= 3 || oCounterDL >= 3 || oCounterBDL >= 3) {
        won("playerTwo");
        return true;
      }
    } else if (gamePlan.length === 15) {
      if (xCounterDR >= 5 || xCounterDL >= 5 || xCounterBDL >= 5) {
        won("playerOne");
        return true;
      } else if (oCounterDR >= 5 || oCounterDL >= 5 || oCounterBDL >= 5) {
        won("playerTwo");
        return true;
      }
    }
  }

  if (whiteCounter === 0) {
    won("tie");
  }

  function won(player) {
    win = true;

    // creating after element to cover game plan + reset button 
    let coverup = document.createElement("div");
    coverup.id = "coverup";
    coverup.style.opacity = ".8";
    coverup.style.backgroundColor = `${playerColors.grey}`;
    coverup.style.position = "absolute";
    coverup.style.top = "3px";
    coverup.style.left = "3px";
    coverup.style.width = "100%";
    coverup.style.height = "100%";
    document.getElementsByClassName("game_container")[0].appendChild(coverup);

    let resetBtn = document.createElement("div");
    resetBtn.id = "resetBtn";
    resetBtn.classList.add((player === "tie") ? "resetBtnT" : (player === "playerOne") ? ((settings.mainColor === "#ff1053") ? "resetBtnP" : "resetBtnB") : "resetBtnY");
    resetBtn.innerHTML = "RESET";
    resetBtn.onclick = restart;
    document.getElementsByClassName("game_container")[0].appendChild(resetBtn);

    let winText = document.createElement("p");
    winText.id = "winText";
    winText.classList.add("winText");
    winText.style.color = (player === "tie") ? playerColors.pearl : (player === "playerOne") ? settings.mainColor : settings.secondColor;
    winText.innerHTML = (player === "tie") ? "PLICHTA" : "VYHRÁL!";
    winText.style.textShadow = `6px 4px 0px ${playerColors.grey}`;
    document.getElementsByClassName("game_container")[0].appendChild(winText);
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

function colorClick(colorDuo, id) {
  tempSettings.mainColor = colorDuo.main;
  tempSettings.secondColor = colorDuo.second;
  if (id === "yellpink") {
    document.getElementById("yellpink").style.opacity = "100%";
    document.getElementById("yellblue").style.opacity = "70%";
  } else {
    document.getElementById("yellpink").style.opacity = "70%";
    document.getElementById("yellblue").style.opacity = "100%";
  }
}


function gameSizeClick(gameSizeInt) {
  if (gameSizeInt === 3) {
    document.getElementById("3x3").style.boxShadow = "inset 0px 0px 0px 10px #ff1053";
    document.getElementById("15x15").style.boxShadow = "none";
    tempSettings.gamePlan = "3";
  } else if (gameSizeInt === 15) {
    document.getElementById("15x15").style.boxShadow = "inset 0px 0px 0px 10px #ff1053";
    document.getElementById("3x3").style.boxShadow = "none";
    tempSettings.gamePlan = "15";
  } else {
    throw "unknown game size";
  }
}

function optionsFetch() {
  settings = { ...tempSettings };
  restart()
}


function restart() {
  htmlSquareGen(settings.gamePlan);
  gamePlan = gamePlanGen(+(settings.gamePlan));
  gamePlanLDiagonal = diagGamePlanGen(+(settings.gamePlan));
  gamePlanRDiagonal = diagGamePlanGen(+(settings.gamePlan));
  win = false;
  round = 1;
  if (document.getElementById("coverup")) {
    document.getElementsByClassName("game_container")[0].removeChild(document.getElementById("coverup"));
  }
  if (document.getElementById("winText")) {
    document.getElementsByClassName("game_container")[0].removeChild(document.getElementById("winText"));
  }
  if (document.getElementById("resetBtn")) {
    document.getElementsByClassName("game_container")[0].removeChild(document.getElementById("resetBtn"));
  }
  if (settings.gamePlan === "15") {
    Array.from(document.getElementsByClassName("square")).forEach((el) => {
      el.style.borderWidth = "1px";
    })
  } else if (settings.gamePlan === "3") {
    Array.from(document.getElementsByClassName("square")).forEach((el) => {
      el.style.borderWidth = "3px";
    })
  } else {
    throw "Unknow size of game plan";
  }
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