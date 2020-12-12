import { readFileSync } from "fs";

let lines = readFileSync("./input", "utf8")
  .split(new RegExp("\n", "gm"))
  .map((line) => [line.substring(0, 1), Number(line.substring(1))]);

const mod = (n, m) => {
  return ((n % m) + m) % m;
};

let shipPos = [0, 0];
let waypointPos = [10, 1];
let headingIdx = 0;
const HEADINGS = ["E", "S", "W", "N"];

const handleWaypoint = (dir, val) => {
  switch (dir) {
    case "N":
      waypointPos[1] += val;
      break;
    case "E":
      waypointPos[0] += val;
      break;
    case "S":
      waypointPos[1] -= val;
      break;
    case "W":
      waypointPos[0] -= val;
      break;
  }
};

lines.forEach(([dir, val], index) => {
  switch (dir) {
    case "L": {
      const quarterRotations = Math.abs(headingIdx - val / 90);

      [...Array(quarterRotations)].forEach(
        (_) => (waypointPos = [-waypointPos[1], waypointPos[0]])
      );
      break;
    }
    case "R": {
      const quarterRotations = Math.abs(headingIdx - val / 90);
      [...Array(quarterRotations)].forEach(
        (_) => (waypointPos = [waypointPos[1], -waypointPos[0]])
      );
      break;
    }
    case "F":
      shipPos = [
        shipPos[0] + val * waypointPos[0],
        shipPos[1] + val * waypointPos[1],
      ];
      break;
    default:
      handleWaypoint(dir, val);
      break;
  }
  //console.log(`After run ${index}: Waypoint(${waypointPos}), Ship(${shipPos})`);
});

console.log(Math.abs(shipPos[0]) + Math.abs(shipPos[1]));
