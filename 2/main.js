import { loadFile } from "../modules/load.js";

const data = `forward 5
down 5
forward 8
up 3
down 8
forward 2`.split("\n");

function parseInstruction(line) {
  const parts = line.split(" ");
  return { op: parts[0], value: parseFloat(parts[1]) };
}

function parseInstructions(data) {
  const v = { x: 0, y: 0, z: 0 };
  for (const line of data) {
    const op = parseInstruction(line);
    switch (op.op) {
      case "forward":
        v.x += op.value;
        break;
      case "up":
        v.y -= op.value;
        break;
      case "down":
        v.y += op.value;
        break;
    }
  }
  return v;
}

// const v = parseInstructions(data);
// console.log(v.x * v.y);

const inputData = (await loadFile("data.txt")).split("\n");
// const v = parseInstructions(inputData);
// console.log(v.x * v.y);

function parseInstructions2(data) {
  const v = { horizontal: 0, depth: 0, aim: 0 };
  for (const line of data) {
    const op = parseInstruction(line);
    switch (op.op) {
      case "forward":
        v.horizontal += op.value;
        v.depth += op.value * v.aim;
        break;
      case "up":
        v.aim -= op.value;
        break;
      case "down":
        v.aim += op.value;
        break;
    }
  }
  return v;
}

const v = parseInstructions2(inputData);
console.log(v.horizontal * v.depth);
