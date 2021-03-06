import runIntCode from '../../runIntCode';
import prepareMemory from './prepareMemory';

// https://adventofcode.com/2019/day/2
export default (memory: number[]) => {
  const preparedMemory = prepareMemory(memory, 12, 2);
  const resultMemory = runIntCode(preparedMemory).memory;

  return resultMemory[0];
};
