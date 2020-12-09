import { readFileSync } from "fs";

let lines = readFileSync("./input", "utf8")
  .split(new RegExp("\n", "gm"))
  .map((lineString) => Number(lineString));

const target = 507622668;
for (let startIndex = 0; startIndex < lines.length; startIndex++) {
  let sum = 0;
  let endIndex = startIndex;

  do {
    sum = sum + lines[endIndex];
    endIndex++;
  } while (sum < target);

  if (sum === target && endIndex != startIndex + 1) {
    const foundSum = lines.slice(startIndex, endIndex).sort((a, b) => a - b);
    const weakness = foundSum[0] + foundSum[foundSum.length-1];

    console.log(
      `Found sum from lines ${startIndex} to ${endIndex}. Weakness: ${weakness}`
    );
  }
}
