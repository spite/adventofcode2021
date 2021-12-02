import { loadNumbers } from "../modules/load.js";

const data = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

function countChanges(data) {
  let prev = data[0];
  let increases = 0;
  let decreases = 0;
  for (let i = 1; i < data.length; i++) {
    if (data[i] > prev) {
      increases++;
    }
    if (data[i] < prev) {
      decreases++;
    }
    prev = data[i];
  }
  return increases;
}

//console.log(countChanges(data));

const data1 = await loadNumbers("1.txt");
// console.log(countChanges(data1));

function countChanges2(data) {
  let prev = data[0];
  let increases = 0;
  let decreases = 0;
  for (let i = 0; i < data.length - 3; i++) {
    let ac = 0;
    for (let j = 0; j < 3; j++) {
      ac += data[i + j];
    }
    // console.log(ac, prev);
    if (ac > prev) {
      increases++;
    }
    if (ac < prev) {
      decreases++;
    }
    prev = ac;
  }
  return increases;
}

// console.log(countChanges2(data));

console.log(countChanges2(data1));
