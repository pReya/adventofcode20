const fs = require("fs");

let input = fs.readFileSync(__dirname + "/input", "utf8");
// Split on empty lines
input = input.split(new RegExp("\n", "gm"));

const binaryPart = (cypher) => {
  const max = Math.pow(2, cypher.length) - 1;
  let range = [0, max];
  let i = 0;
  while (range[0] != range[1]) {
    const partitionLength = range[1] - range[0] + 1;
    if (cypher[i] === "B" || cypher[i] === "R") {
      //UPPER
      range[0] += partitionLength / 2;
    } else if (cypher[i] === "F" || cypher[i] === "L") {
      // LOWER
      range[1] -= partitionLength / 2;
    }
    i++;
  }
  return range[0];
};

const decodeSeatNumber = (cypher) => {
  const seatIndex = 7;
  const rowCypher = cypher.substring(0, seatIndex);
  const seatCypher = cypher.substring(seatIndex);

  const row = binaryPart(rowCypher);
  const seat = binaryPart(seatCypher);
  const id = row * 8 + seat;

  return { row, seat, id };
};

let maxId = 0;
const decoded = input.map((line) => {
  const lineDecoded = decodeSeatNumber(line);

  if (lineDecoded.id > maxId) {
    maxId = lineDecoded.id;
  }

  return lineDecoded;
});

console.log("Max ID found:", maxId);

exports.decoded = decoded;