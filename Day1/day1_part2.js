const fs = require("node:fs/promises");

async function main() {
  // Read and process the file
  const input = (await fs.readFile("./input.txt")).toString();

  // Split and map the input into left and right lists
  const [left, right] = input.split("\n").map(e => e.trim().split("   ")).reduce((acc, cur) => {
    acc[0].push(cur[0]);
    acc[1].push(cur[1]);
    return acc;
  }, [[], []]);

  // Calculate the similarity score
  let similarityScore = 0;

  // For each number in the left list
  for (let num of left) {
    // Count how many times `num` appears in the right list
    const countInRight = right.filter(item => item === num).length;

    // Multiply the number by the count and add to the total similarity score
    similarityScore += num * countInRight;
  }

  // Output the similarity score
  console.log(similarityScore);
}

(async () => main())();
