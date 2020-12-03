const fs = require('fs');

const contents = fs.readFileSync(__dirname + '/input', 'utf8');
let lines = contents.split('\n');
console.log(`Found ${lines.length} lines in the pattern`);

lines = lines.map((line) => line.split(''));

const moveY = 1;
const moveX = 3;

let currentPosX = 0;
let currentPosY = 0;
let treeCount = 0;

do {
  currentPosY = (currentPosY + moveY);
  currentPosX = (currentPosX + moveX) % lines[0].length;
  console.log(currentPosY);

  const currentField = lines[currentPosY][currentPosX];

  if (currentField === '#')
  {
    treeCount += 1;
  }
} while (currentPosY < (lines.length - moveY));

console.log(`${treeCount} trees found`);