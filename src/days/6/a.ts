import { buildOrbitTree, countOrbits, Orbit } from './orbits';

// https://adventofcode.com/2019/day/6
export default (orbits: Orbit[]) => {
  const com = buildOrbitTree(orbits);
  const numOrbits = countOrbits(com);

  return numOrbits;
};
