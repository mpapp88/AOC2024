const fs = require("node:fs/promises");

async function main() {
  // Read the input data from the file
  const input = (await fs.readFile("./input.txt")).toString();

  // Split the input into individual reports (lines)
  const reports = input.split("\n").map(line => line.trim().split(" ").map(Number));

  let safeReportsCount = 0;

  // Function to check if a report is safe
  function isSafe(report) {
    let isIncreasing = null;

    // Loop through each adjacent pair of numbers in the report
    for (let i = 0; i < report.length - 1; i++) {
      const diff = Math.abs(report[i + 1] - report[i]);

      // Check if the difference is between 1 and 3 (inclusive)
      if (diff < 1 || diff > 3) {
        return false; // If any difference is out of bounds, it's not safe
      }

      // Check if the sequence is increasing or decreasing
      if (isIncreasing === null) {
        // Set initial direction (increasing or decreasing)
        isIncreasing = report[i + 1] > report[i];
      } else {
        // Check if the report is consistently increasing or decreasing
        if ((isIncreasing && report[i + 1] < report[i]) || (!isIncreasing && report[i + 1] > report[i])) {
          return false; // If it changes direction, it's not safe
        }
      }
    }
    return true; // If all checks pass, it's safe
  }

  // Process each report and check if it's safe
  for (const report of reports) {
    if (isSafe(report)) {
      safeReportsCount++;
    }
  }

  // Output the count of safe reports
  console.log(safeReportsCount);
}

(async () => main())();
