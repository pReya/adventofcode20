const fs = require("fs");

let input = fs.readFileSync(__dirname + "/input", "utf8");
input = input.split(new RegExp("\n^\n", "gm"));
input = input.map((group) => group.split("\n"));

const result = input.reduce(
  (acc, group) =>
    acc +
    group.reduce((groupAcc, person) =>
      person.split("").filter(Set.prototype.has, new Set(groupAcc))
    ).length,
  0
);

console.log(result);
