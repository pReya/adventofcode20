import { readFileSync } from "fs";

let input = readFileSync("./input", "utf8");
input = input.split(new RegExp("\n", "gm"));

let acc = 0;
let history = new Set();
let pc = 0;
let exitLoop = false;

do {
  if (exitLoop) break;
  const lastHistorySize = history.size;
  const instruction = input[pc];
  const [op, address] = instruction.split(" ");

  //console.log({ op, address, pc, acc });

  switch (op) {
    case "jmp":
      history.add(pc);
      if (history.size !== lastHistorySize + 1) {
        console.log("Double instruction JMP");
        exitLoop = true;
      }
      pc = pc + Number(address);
      break;
    case "acc":
      history.add(pc);
      if (history.size === lastHistorySize + 1) {
        acc += Number(address);
      } else {
        console.log("Double instruction ACC");
        exitLoop = true;
      }
      pc++;
      break;
    case "nop":
    default:
      history.add(pc);
      if (history.size !== lastHistorySize + 1) {
        console.log("Double instruction NOP");
        exitLoop = true;
      }
      pc++;
  }
} while (input[pc]);

if (exitLoop) console.log("Faulty exit. Acc:", acc);
