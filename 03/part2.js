const fs = require("fs");

const contents = fs.readFileSync(__dirname + "/input", "utf8");
let lines = contents.split("\n");

console.log(`Found ${lines.length} lines in the pattern`);
lines = lines.map((line) => line.split(""));

// [right, down] or [x,y]
const moves = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

const results = [];

for (const move of moves) {
  let currentPosX = 0;
  let currentPosY = 0;
  let treeCount = 0;

  const [moveX, moveY] = move;

  do {
    currentPosY = currentPosY + moveY;
    currentPosX = (currentPosX + moveX) % lines[0].length;

    const currentField = lines[currentPosY][currentPosX];

    if (currentField === "#") {
      treeCount += 1;
    }
  } while (currentPosY < lines.length - moveY);
  results.push(treeCount);
  console.log(`${treeCount} trees found for move ${move}`);
}

console.log("Product of all results is ", results.reduce((a, b) => a * b));

