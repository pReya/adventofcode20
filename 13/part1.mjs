import { readFileSync } from "fs";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

let [now, busses] = readFileSync(__dirname + "/input", "utf8")
  .split(new RegExp("\n", "gm"))
  .map((line) =>
    line
      .split(",")
      .map((times) => Number(times))
      .filter(Boolean)
  );

let candidate;
let time = now;
while (!(candidate = busses.find((bus) => time % bus === 0))) {
  time++;
}
console.log((time - now) * candidate);
