const fs = require("fs");

function isValid(passport) {
  properties = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  return properties.every((prop) => prop in passport);
}

let input = fs.readFileSync(__dirname + "/input", "utf8");
// Split on empty lines
input = input.split(new RegExp("^\n", "gm"));

// Remove line breaks in single datasets, spaces at end of line and split
input = input.map((passportWithNewlines) =>
  passportWithNewlines
    .replace(new RegExp("\n", "gm"), " ")
    .replace(new RegExp(" $", "gm"), "")
    .split(" ")
);

input = input.map((passport) =>
  Object.fromEntries(passport.map((pair) => pair.split(":")))
);

const validCount = input.reduce((acc, passport) => {
  if (isValid(passport)) {
    return acc + 1;
  } else {
    return acc;
  }
}, 0);

console.log(`Found ${validCount} valid passports`);
