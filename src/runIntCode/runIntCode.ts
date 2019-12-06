import _ from 'lodash';

type Memory = number[];
type Operations = Record<
  number,
  (modes: number[], ...params: number[]) => void
>;

export const parseInstructionHead = (value: number) => {
  const opCode = value % 100;
  const paramModes =
    value >= 100
      ? Math.floor(value / 100)
          .toString()
          .split('')
          .map(mode => (mode === '1' ? 1 : 0))
          .reverse()
      : [];

  return { opCode, paramModes };
};

class IntCodeComputer {
  constructor(public memory: Memory, private input?: number) {}

  outputs: number[] = [];

  private operations: Operations = {
    // Addition
    1: ([aMode, bMode], a, b, dest) => {
      this.memory[dest] = this.getParam(a, aMode) + this.getParam(b, bMode);
    },
    // Multiplication
    2: ([aMode, bMode], a, b, dest) => {
      this.memory[dest] = this.getParam(a, aMode) * this.getParam(b, bMode);
    },
    // Input
    3: (modes, dest) => {
      this.memory[dest] = this.input!;
    },
    // Output
    4: ([mode], param) => {
      this.outputs.push(this.getParam(param, mode));
    },
  };

  run() {
    let instructionPointer = 0;
    let increment = 0;

    do {
      increment = this.runInstruction(instructionPointer);
      instructionPointer += increment;
    } while (increment);
  }

  private getParam(value: number, mode: number) {
    return mode ? value : this.memory[value];
  }

  private runInstruction(instructionPointer: number): number {
    const { opCode, paramModes } = parseInstructionHead(
      this.memory[instructionPointer],
    );

    if (opCode === 99) {
      return 0;
    }

    const operation = this.operations[opCode];
    const numParams = operation.length - 1;
    const params = this.memory.slice(
      instructionPointer + 1,
      instructionPointer + numParams + 1,
    );

    operation(paramModes, ...params);

    return numParams + 1;
  }
}

const runIntCode = (memory: Memory, input?: number) => {
  const computer = new IntCodeComputer(memory, input);
  computer.run();

  return computer;
};

export default runIntCode;
