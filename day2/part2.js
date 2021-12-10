const fs = require("fs");

const rawfile = fs.readFileSync("./raw.txt", "utf-8");
const steps = rawfile.split("\n");

const state = {
  x: 0,
  y: 0,
  aim: 0,
};

for (let i = 0; i < steps.length; i++) {
  const [command, number] = steps[i].trim().split(" ");

  switch (command) {
    case "forward":
      state.x += parseInt(number);
      state.y += state.aim * parseInt(number);
      break;

    case "up":
      state.aim -= parseInt(number);
      break;

    case "down":
      state.aim += parseInt(number);
      break;
  }
}

const result = state.x * state.y;

console.log("Part 2 result:", result);
