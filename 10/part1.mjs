import { readFileSync } from "fs";

let lines = readFileSync("./input", "utf8")
  .split(new RegExp("\n", "gm"))
  .map((lineString) => Number(lineString))
  .sort((a, b) => a - b);

console.log(lines);

const steps = [];
for (let i = 0; i < lines.length - 1; i++) {
  const diff = lines[i + 1] - lines[i];
  if (!steps[diff - 1]) {
    steps[diff - 1] = 0;
  }
  steps[diff - 1] += 1;
}

// First adapter from 0 -> 1
// Last adapter from MAX -> MAX + 3
steps[0] += 1;
steps[2] += 1;

console.log(steps);
console.log(steps[0] * steps[2]); 
