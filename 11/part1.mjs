import { readFileSync } from "fs";

let lines = readFileSync("./input", "utf8")
  .split(new RegExp("\n", "gm"))
  .map((line) => line.split(""));

const gridGet = (arr, x, y) => arr[x] && arr[x][y];

const countOccupiedSeats = (arr) =>
  arr.reduce(
    (acc, line) =>
      acc +
      line.reduce((lineAcc, seat) => (seat === "#" ? lineAcc + 1 : lineAcc), 0),
    0
  );

const optimize = (arr) => {
  let clone = JSON.parse(JSON.stringify(arr));
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      const current = arr[i][j];
      const adjacent = {
        top: gridGet(arr, i - 1, j),
        topRight: gridGet(arr, i - 1, j + 1),
        right: gridGet(arr, i, j + 1),
        bottomRight: gridGet(arr, i + 1, j + 1),
        bottom: gridGet(arr, i + 1, j),
        bottomLeft: gridGet(arr, i + 1, j - 1),
        left: gridGet(arr, i, j - 1),
        topLeft: gridGet(arr, i - 1, j - 1),
      };
      const adjacentOccupiedCounter = Object.values(adjacent).reduce(
        (acc, cur) => (cur === "#" ? acc + 1 : acc),
        0
      );

      if (current === "L" && adjacentOccupiedCounter === 0) {
        clone[i][j] = "#";
      } else if (current === "#" && adjacentOccupiedCounter >= 4) {
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
//console.log(lastResult.map((line) => line.join("")).join("\n"));
