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

test(
  'detects input equal to 8 with position mode',
  testOutput,
  [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
  8,
  [1],
);
test(
  'detects input not equal to 8 with position mode',
  testOutput,
  [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
  9,
  [0],
);

test(
  'detects input less than 8 with position mode',
  testOutput,
  [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8],
  7,
  [1],
);
test(
  'detects input not less than 8 with position mode',
  testOutput,
  [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8],
  8,
  [0],
);

test(
  'detects input equal to 8 with immediate mode',
  testOutput,
  [3, 3, 1108, -1, 8, 3, 4, 3, 99],
  8,
  [1],
);
test(
  'detects input not equal to 8 with immediate mode',
  testOutput,
  [3, 3, 1108, -1, 8, 3, 4, 3, 99],
  3,
  [0],
);

test(
  'detects input less than 8 with immediate mode',
  testOutput,
  [3, 3, 1107, -1, 8, 3, 4, 3, 99],
  3,
  [1],
);
test(
  'detects input not less than 8 with immediate mode',
  testOutput,
  [3, 3, 1107, -1, 8, 3, 4, 3, 99],
  18,
  [0],
);

// Here are some jump tests that take an input, then output 0 if the input was zero or 1 if the input was non-zero:
test(
  'uses jumps and position mode to output 0 for 0 input',
  testOutput,
  [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9],
  0,
  [0],
);
test(
  'uses jumps and position mode to output 1 for non-zero input',
  testOutput,
  [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9],
  5,
  [1],
);

test(
  'uses jumps and immediate mode to output 0 for 0 input',
  testOutput,
  [3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1],
  0,
  [0],
);
test(
  'uses jumps and immediate mode to output 1 for non-zero input',
  testOutput,
  [3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1],
  5,
  [1],
);

const eightComparatorProgram = [
  3,
  21,
  1008,
  21,
  8,
  20,
  1005,
  20,
  22,
  107,
  8,
  21,
  20,
  1006,
  20,
  31,
  1106,
  0,
  36,
  98,
  0,
  0,
  1002,
  21,
  125,
  20,
  4,
  20,
  1105,
  1,
  46,
  104,
  999,
  1105,
  1,
  46,
  1101,
  1000,
  1,
  20,
  4,
  20,
  1105,
  1,
  46,
  98,
  99,
];

test('detects values less than 8', testOutput, eightComparatorProgram, 4, [
  999,
]);
test('detects 8', testOutput, eightComparatorProgram, 8, [1000]);
test('detects values greater than 8', testOutput, eightComparatorProgram, 73, [
  1001,
]);

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
