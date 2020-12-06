const fs = require("fs");

let input = fs.readFileSync(__dirname + "/input", "utf8");
input = input.split(new RegExp("\n^\n", "gm"));
input = input.map((group) => group.split("\n"));

const result = input.reduce((acc, group) => {
  const charSet = new Set();

  group.forEach((person) => {
    person.split("").forEach((char) => charSet.add(char));
  });

  return acc + charSet.size;
}, 0);

console.log(result);
