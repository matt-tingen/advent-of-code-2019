import runIntCode from '../../runIntCode';

// https://adventofcode.com/2019/day/5#part2
export default (memory: number[]) => {
  const { outputs } = runIntCode(memory, 5);
  const [diagnosticCode] = outputs;

  return diagnosticCode;
};
