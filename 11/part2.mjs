import { readFileSync } from "fs";

let lines = readFileSync(
  "/home/codespace/workspace/adventofcode20/11/input",
  "utf8"
)
  .split(new RegExp("\n", "gm"))
  .map((line) => line.split(""));

const printGrid = (arr) =>
  console.log(arr.map((line) => line.join("")).join("\n"));
const gridGet = (arr, x, y) => arr[x] && arr[x][y];

const top = (x, y) => [x - 1, y];
const topRight = (x, y) => [x - 1, y + 1];
const right = (x, y) => [x, y + 1];
const bottomRight = (x, y) => [x + 1, y + 1];
const bottom = (x, y) => [x + 1, y];
const bottomLeft = (x, y) => [x + 1, y - 1];
const left = (x, y) => [x, y - 1];
const topLeft = (x, y) => [x - 1, y - 1];

const countOccupiedSeats = (arr) =>
  arr.reduce(
    (acc, line) =>
      acc +
      line.reduce((lineAcc, seat) => (seat === "#" ? lineAcc + 1 : lineAcc), 0),
    0
  );

const traverseGrid = (arr, x, y, mod) => {
  let currentSeat = "";

  do {
    [x, y] = mod(x, y);
    currentSeat = gridGet(arr, x, y);
  } while (currentSeat === ".");

  return currentSeat;
};

const optimize = (arr) => {
  let clone = JSON.parse(JSON.stringify(arr));
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      const current = arr[i][j];

      const inSight = {
        top: traverseGrid(arr, i, j, top),
        topRight: traverseGrid(arr, i, j, topRight),
        right: traverseGrid(arr, i, j, right),
        bottomRight: traverseGrid(arr, i, j, bottomRight),
        bottom: traverseGrid(arr, i, j, bottom),
        bottomLeft: traverseGrid(arr, i, j, bottomLeft),
        left: traverseGrid(arr, i, j, left),
        topLeft: traverseGrid(arr, i, j, topLeft),
      };
      const inSightOccupiedCounter = Object.values(inSight).reduce(
        (acc, cur) => (cur === "#" ? acc + 1 : acc),
        0
      );

      if (current === "L" && inSightOccupiedCounter === 0) {
        clone[i][j] = "#";
      } else if (current === "#" && inSightOccupiedCounter >= 5) {
        clone[i][j] = "L";
      }
    }
  }
  return clone;
};

let lastResult = lines;
let breakLoop = false;
let i = 0;

do {
  let newResult = optimize(lastResult);

  if (JSON.stringify(newResult) !== JSON.stringify(lastResult)) {
    i++;
    lastResult = newResult;
  } else {
    breakLoop = true;
  }
} while (!breakLoop);

console.log("Rounds of optimizations:", i);
console.log("Occupied seats:", countOccupiedSeats(lastResult));
//printGrid(lastResult);
