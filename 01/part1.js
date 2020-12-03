const fs = require("fs");

let input = fs.readFileSync(__dirname + "/input", "utf8");
input = input.split("\n");
input = input.map((numberString) => Number(numberString));

for (let i = 0; i < input.length - 2; i++) {
  for (let j = i + 1; j < input.length - 1; j++) {
    const sum = input[i] + input[j];
    if (sum === 2020) {
      const product = input[i] * input[j];
      console.log(`Result for ${input[i]} * ${input[j]}: ${product}`);
    }
  }
}
