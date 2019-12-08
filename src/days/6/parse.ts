import { Orbit } from './orbits';

const parseOrbits = (string: string) =>
  string.split('\n').map(line => line.split(')') as Orbit);

export default parseOrbits;
