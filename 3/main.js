import { loadFile } from "../modules/load.js";

const sample = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`.split("\n");

function getRates(data) {
  const totalBits = data[0].length;
  let gamma = "";
  for (let i = 0; i < totalBits; i++) {
    let bits = 0;
    for (const sample of data) {
      if (sample[i] === "1") {
        bits++;
      }
    }
    gamma += bits > 0.5 * data.length ? "1" : "0";
  }
  const gammaRate = parseInt(gamma, 2);
  const epsilonRate = Math.pow(2, totalBits) - 1 - gammaRate;
  return { gammaRate, epsilonRate };
}

// const res = getRates(sample);
// console.log(res.gammaRate * res.epsilonRate);

const inputData = (await loadFile("data.txt")).split("\r\n");
const res = getRates(inputData);
console.log(res.gammaRate * res.epsilonRate);
