import { readFileSync } from "fs";

let input = readFileSync("./input", "utf8");
input = input.split(new RegExp("\n", "gm"));

// Find all occurrences of nop/jmop
let jmpOrNopIndexes = [];

input.forEach((instruction, index) => {
  const [op, _] = instruction.split(" ");
  if ((op === "jmp") | (op === "nop")) {
    jmpOrNopIndexes.push(index);
  }
});

// Creat multiple, modified programs

let programs = [];

jmpOrNopIndexes.forEach((changeIndex) => {
  const clone = [...input];
  const [op, address] = clone[changeIndex].split(" ");
  if (op === "jmp") {
    clone[changeIndex] = `nop ${address}`;
  } else if (op === "nop") {
    clone[changeIndex] = `jmp ${address}`;
  }
  programs.push(clone);
});

// Run all modified programs

programs.forEach((program) => {
  let acc = 0;
  let history = new Set();
  let pc = 0;
  let exitLoop = false;

  do {
    if (exitLoop) break;
    const lastHistorySize = history.size;
    const instruction = program[pc];
    const [op, address] = instruction.split(" ");

    //console.log({ op, address, pc, acc });

    switch (op) {
      case "jmp":
        history.add(pc);
        if (history.size !== lastHistorySize + 1) {
          // console.log("Double instruction JMP");
          exitLoop = true;
        }
        pc = pc + Number(address);
        break;
      case "acc":
        history.add(pc);
        if (history.size === lastHistorySize + 1) {
          acc += Number(address);
        } else {
          // console.log("Double instruction ACC");
          exitLoop = true;
        }
        pc++;
        break;
      case "nop":
      default:
        history.add(pc);
        if (history.size !== lastHistorySize + 1) {
          // console.log("Double instruction NOP");
          exitLoop = true;
        }
        pc++;
    }
  } while (program[pc]);
  if (!exitLoop) {
    console.log("Finished successfully. Acc: ", acc);
  }
});
