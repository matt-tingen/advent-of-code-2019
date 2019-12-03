import { runIntCode } from './intCode';

// https://adventofcode.com/2019/day/2
export default (memory: number[]) => {
  const alteredMemory = [...memory];
  alteredMemory[1] = 12;
  alteredMemory[2] = 2;

  const resultMemory = runIntCode(alteredMemory);
  return resultMemory[0];
};
