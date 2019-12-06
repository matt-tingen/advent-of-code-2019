import test, { Macro } from 'ava';
import runIntCode from './runIntCode';

const testRunIntCode: Macro<[number[], number[]]> = (
  t,
  startMemory,
  endMemory,
) => {
  t.deepEqual(runIntCode(startMemory), endMemory);
};
testRunIntCode.title = (title, startMemory, endMemory) =>
  `${startMemory.join(',')} yields ${endMemory.join(',')}`;

test(testRunIntCode, [1, 0, 0, 0, 99], [1 + 1, 0, 0, 0, 99]);
test(testRunIntCode, [2, 3, 0, 3, 99], [2, 3, 0, 3 * 2, 99]);
test(testRunIntCode, [2, 4, 4, 5, 99, 0], [2, 4, 4, 5, 99, 99 * 99]);
test(
  testRunIntCode,
  [1, 1, 1, 4, 99, 5, 6, 0, 99],
  [30, 1, 1, 4, 2, 5, 6, 0, 99],
);
test(
  testRunIntCode,
  [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50],
  [3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50],
);
