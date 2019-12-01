export const fuelRequired = (mass: number) => {
  return Math.floor(mass / 3) - 2;
};

export const fuelRequiredRecursive = (mass: number) => {
  let totalFuel = 0;
  let prevMass = mass;

  while (prevMass) {
    prevMass = Math.max(0, fuelRequired(prevMass));
    totalFuel += prevMass;
  }

  return totalFuel;
};
