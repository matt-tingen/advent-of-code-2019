import { runIntCode } from './intCode';

// https://adventofcode.com/2019/day/2#part2
export default (program: number[]) => {
  const alteredProgram = [...program];
  alteredProgram[1] = 12;
  alteredProgram[2] = 2;

  const resultProgram = runIntCode(alteredProgram);
  return resultProgram[0];
};
