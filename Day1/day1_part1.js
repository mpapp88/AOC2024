
const fs = require("node:fs/promises");
const readFile = fs.readFile
async function main() {
  const input = (await readFile("./input.txt")).toString();
  const [left, right] = input.split("\n").map(e => e.trim().split("   ")).reduce((acc, cur) => {
    acc[0].push(cur[0]);
    acc[1].push(cur[1]);
    return acc;
  },[[], []]);

  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);


  let result = 0;
  for(let i = 0; i < left.length; i++) {
    result += Math.abs(right[i] - left[i]);
  }

  console.log(result);
}

(async () => main())();