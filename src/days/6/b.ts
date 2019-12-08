import { buildOrbitTree, calcDistance, Orbit } from './orbits';

// https://adventofcode.com/2019/day/6#part2
export default (orbits: Orbit[]) => {
  const { bodies } = buildOrbitTree(orbits);
  const source = bodies.YOU.primary!;
  const dest = bodies.SAN.primary!;
  const numTransfers = calcDistance(source, dest);

  return numTransfers;
};
