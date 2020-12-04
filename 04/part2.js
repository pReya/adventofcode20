const fs = require("fs");

const validYearBetween = (year, min, max) =>
  Number.isInteger(Number(year)) && year >= min && year <= max;

function isValid(passport) {
  properties = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  const hasAllProps = properties.every((prop) => prop in passport);

  const isValidBirthYear = validYearBetween(passport.byr, 1920, 2002);
  const isValidIssueYear = validYearBetween(passport.iyr, 2010, 2020);
  const isValidExpirationYear = validYearBetween(passport.eyr, 2020, 2030);

  const isValidHeight = passport.hgt && validateHeight(passport.hgt);
  const isValidHairColor = passport.hcl?.match(
    new RegExp("^\\#[0-9a-f]{6}$", "i")
  );
  const isValidEyeColor = passport.ecl?.match(
    new RegExp("^amb|blu|brn|gry|grn|hzl|oth$", "i")
  );
  const isValidPid = passport.pid?.match(new RegExp("^\\d{9}$"));
  console.log({
    passport,
    hasAllProps,
    isValidHeight,
    isValidBirthYear,
    isValidIssueYear,
    isValidExpirationYear,
    isValidHairColor,
    isValidEyeColor,
    isValidPid,
  });
  return (
    hasAllProps &&
    isValidBirthYear &&
    isValidIssueYear &&
    isValidExpirationYear &&
    isValidHeight &&
    isValidHairColor &&
    isValidEyeColor &&
    isValidPid
  );
}

function validateHeight(height) {
  const heightMatch = height.match(new RegExp("^(\\d{2,3})(cm|in)"));

  if (heightMatch && heightMatch[2] === "in") {
    return heightMatch[1] >= 59 && heightMatch[1] <= 76;
  } else if (heightMatch && heightMatch[2] === "cm") {
    return heightMatch[1] >= 150 && heightMatch[1] <= 193;
  }
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
