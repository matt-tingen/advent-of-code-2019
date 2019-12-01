const fuelRequired = (mass: number) => {
  return Math.floor(mass / 3) - 2;
};

export default fuelRequired;
