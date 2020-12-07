import { readFileSync } from "fs";

let input = readFileSync("./input", "utf8");
input = input.split(new RegExp("\n", "gm"));

input = new Map(
  input.map((line) => {
    let [parent, children] = line.split(" bags contain ");
    children = children
      .replace(new RegExp("\\d+ ", "g"), "")
      .split(new RegExp(" bags?(?:, |.)", "g"))
      .filter(Boolean);
    return [parent, children];
  })
);

let startColors = [];
for (let [bag, children] of input) {
  if (children.includes("shiny gold")) startColors.push(bag);
}

let candidates = [startColors];

for (let i = 0; i < 99; i++) {
  const parentColors = candidates[i];
  const allGrandParentColors = parentColors
    ?.map((parentColor) => {
      let grandParentColors = [];
      for (let [bag, children] of input) {
        if (children.includes(parentColor)) {
          grandParentColors.push(bag);
        }
      }
      return grandParentColors;
    })
    .flat()
    .filter(Boolean);
  if (allGrandParentColors?.length) candidates.push(allGrandParentColors);
}

console.log(new Set(candidates.flat()).size);
