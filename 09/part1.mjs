import { readFileSync } from "fs";

let lines = readFileSync("./input", "utf8")
  .split(new RegExp("\n", "gm"))
  .map((lineString) => Number(lineString));

function twoSum(arr, sum) {
  let sums = [];
  let hashTable = {};

  arr.forEach((curr) =>
    hashTable[sum - curr]
      ? sums.push([curr, sum - curr])
      : (hashTable[curr] = curr)
  );

  return sums;
}

for (let i = 25; i < lines.length; i++) {
  const arr = lines.slice(i - 25, i);
  const isSum = twoSum(arr, lines[i]);
  if (isSum.length === 0) {
    console.log(lines[i]);
  }
}
