import { readFileSync } from "fs";

let lines = readFileSync("./input", "utf8")
  .split(new RegExp("\n", "gm"))
  .map((line) => [line.substring(0, 1), Number(line.substring(1))]);

const mod = (n, m) => {
  return ((n % m) + m) % m;
};

let horizontal = 0;
let vertical = 0;
let headingIdx = 0;
const HEADINGS = ["E", "S", "W", "N"];

const handleAbsolute = (dir, val) => {
  switch (dir) {
    case "N":
      vertical += val;
      break;
    case "E":
      horizontal += val;
      break;
    case "S":
      vertical -= val;
      break;
    case "W":
      horizontal -= val;
      break;
  }
};

lines.forEach(([dir, val], index) => {
  switch (dir) {
    case "L":
      headingIdx = mod(headingIdx - val / 90, HEADINGS.length);
      break;
    case "R":
      headingIdx = mod(headingIdx + val / 90, HEADINGS.length);
      break;
    case "F":
      dir = HEADINGS[headingIdx];
      handleAbsolute(dir, val);
      break;
    default:
      handleAbsolute(dir, val);
      break;
  }
});

console.log({
  vertical,
  horizontal,
  manhattan: Math.abs(vertical) + Math.abs(horizontal),
});
