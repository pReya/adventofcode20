import { readFileSync } from "fs";

let lines = readFileSync("./input", "utf8")
  .split(new RegExp("\n", "gm"))
  .map((lineString) => Number(lineString))
  .sort((a, b) => a - b);

lines.push(Math.max(...lines) + 3);

let routeMap = new Map();
routeMap.set(0, 1);

for (let i = 0; i < lines.length; i++) {
  const curr = lines[i];
  routeMap.set(
    curr,
    (routeMap.get(curr - 1) ?? 0) +
      (routeMap.get(curr - 2) ?? 0) +
      (routeMap.get(curr - 3) ?? 0)
  );
}

console.log(routeMap.get(lines[lines.length - 1]));
