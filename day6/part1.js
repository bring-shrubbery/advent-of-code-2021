const fs = require("fs");

const rawFile = fs.readFileSync("./raw.txt", "utf-8");
const rawNumbers = rawFile.split(",").map((n) => parseInt(n));

const createNewFish = (initialValue) => {
  return {
    ...{
      value: initialValue,
      step: function () {
        this.value--;

        if (this.value < 0) {
          this.value = 6;
          return true;
        }

        return false;
      },
    },
  };
};

const fishes = rawNumbers.map(createNewFish);

let t = 0;
while (t < 80) {
  // console.log("Day ${t}:", fishes.map(({ value }) => value).join());

  const oldFishLength = fishes.length;
  for (let i = 0; i < oldFishLength; i++) {
    const didSpawnNewFish = fishes[i].step();

    if (didSpawnNewFish) {
      fishes.push(createNewFish(8));
    }
  }

  t++;
}

console.log("Fishes after 80 days:", fishes.length);
