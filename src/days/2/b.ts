import { runIntCode } from './intCode';
import prepareMemory from './prepareMemory';

const GOAL = 19690720;

// https://adventofcode.com/2019/day/2#part2
export default (memory: number[]) => {
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      const preparedMemory = prepareMemory(memory, noun, verb);
      const resultMemory = runIntCode(preparedMemory);

      if (resultMemory[0] === GOAL) {
        return 100 * noun + verb;
      }
    }
  }
};
