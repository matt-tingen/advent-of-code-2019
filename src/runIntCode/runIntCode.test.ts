import test, { Macro } from 'ava';
import runIntCode, { parseInstructionHead } from './runIntCode';

const testMemory: Macro<[number[], number[]]> = (t, startMemory, endMemory) => {
  t.deepEqual(runIntCode(startMemory).memory, endMemory);
};
testMemory.title = (title, startMemory, endMemory) =>
  title || `${startMemory.join(',')} yields ${endMemory.join(',')}`;

test(testMemory, [1, 0, 0, 0, 99], [1 + 1, 0, 0, 0, 99]);
test(testMemory, [2, 3, 0, 3, 99], [2, 3, 0, 3 * 2, 99]);
test(testMemory, [2, 4, 4, 5, 99, 0], [2, 4, 4, 5, 99, 99 * 99]);
test(
  testMemory,
  [1, 1, 1, 4, 99, 5, 6, 0, 99],
  [5 * 6, 1, 1, 4, 1 + 1, 5, 6, 0, 99],
);
test(
  testMemory,
  [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50],
  [(30 + 40) * 50, 9, 10, 30 + 40, 2, 3, 11, 0, 99, 30, 40, 50],
);

test('uses param modes', testMemory, [1101, 0, 0, 0, 99], [0, 0, 0, 0, 99]);
test(
  'supports negative values',
  testMemory,
  [1101, 100, -1, 4, 0],
  [1101, 100, -1, 4, 99],
);

const testOutput: Macro<[number[], number, number[]]> = (
  t,
  startMemory,
  input,
  outputs,
) => {
  t.deepEqual(runIntCode(startMemory, input).outputs, outputs);
};
testOutput.title = (title, startMemory, input, outputs) =>
  title ||
  `${startMemory.join(',')} with input ${input} outputs ${JSON.stringify(
    outputs,
  )}`;

test(testOutput, [3, 0, 4, 0, 99], 0, [0]);
test(testOutput, [3, 0, 4, 0, 99], 42, [42]);

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
