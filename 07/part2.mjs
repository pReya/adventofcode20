import { readFileSync } from "fs";

let input = readFileSync("./input", "utf8");
input = input.split(new RegExp("\n", "gm"));

input = new Map(
  input.map((line) => {
    let [parent, children] = line.split(" bags contain ");
    children = children
      .split(new RegExp(" bags?(?:, |.)", "g"))
      .filter(Boolean);
    return [parent, children];
  })
);

function getChildrenCount(color) {
  const children = input.get(color);
  if (children.length === 1 && children[0] === "no other") {
    return 1;
  } else {
    return children.reduce((acc, child) => {
      const [amount, color] = child
        .split(new RegExp("^(\\d+) ", "g"))
        .filter(Boolean);
      return acc + Number(amount) * getChildrenCount(color);
    }, 1);
  }
}

console.log(getChildrenCount("shiny gold") - 1);
