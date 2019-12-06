import test, { Macro } from 'ava';
import runIntCode, { parseInstructionHead } from './runIntCode';

const testRunIntCode: Macro<[number[], number[]]> = (
  t,
  startMemory,
  endMemory,
) => {
  t.deepEqual(runIntCode(startMemory), endMemory);
};
testRunIntCode.title = (title, startMemory, endMemory) =>
  title || `${startMemory.join(',')} yields ${endMemory.join(',')}`;

test(testRunIntCode, [1, 0, 0, 0, 99], [1 + 1, 0, 0, 0, 99]);
test(testRunIntCode, [2, 3, 0, 3, 99], [2, 3, 0, 3 * 2, 99]);
test(testRunIntCode, [2, 4, 4, 5, 99, 0], [2, 4, 4, 5, 99, 99 * 99]);
test(
  testRunIntCode,
  [1, 1, 1, 4, 99, 5, 6, 0, 99],
  [5 * 6, 1, 1, 4, 1 + 1, 5, 6, 0, 99],
);
test(
  testRunIntCode,
  [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50],
  [(30 + 40) * 50, 9, 10, 30 + 40, 2, 3, 11, 0, 99, 30, 40, 50],
);

test('uses param modes', testRunIntCode, [1101, 0, 0, 0, 99], [0, 0, 0, 0, 99]);

const testParseInstructionHead: Macro<[number, number, number[]]> = (
  t,
  instructionHead,
  opCode,
  paramModes,
) => {
  t.deepEqual(parseInstructionHead(instructionHead), { opCode, paramModes });
};
testParseInstructionHead.title = (title, instructionHead, opCode, paramModes) =>
  `${instructionHead} parses to ${opCode}, ${JSON.stringify(paramModes)}`;

test(testParseInstructionHead, 1, 1, []);
test(testParseInstructionHead, 1111, 11, [1, 1]);
test(testParseInstructionHead, 1002, 2, [0, 1]);
