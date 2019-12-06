import _ from 'lodash';

type Memory = number[];
type Operation = (modes: number[], ...params: number[]) => boolean | void;

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

  private instructionPointer = 0;
  private operations: Operation[] = [
    _.noop,
    // 1: addition
    ([aMode, bMode], a, b, dest) => {
      this.memory[dest] = this.getParam(a, aMode) + this.getParam(b, bMode);
    },
    // 2: multiplication
    ([aMode, bMode], a, b, dest) => {
      this.memory[dest] = this.getParam(a, aMode) * this.getParam(b, bMode);
    },
    // 3: input
    (modes, dest) => {
      this.memory[dest] = this.input!;
    },
    // 4: output
    ([mode], param) => {
      this.outputs.push(this.getParam(param, mode));
    },
    // 5: jump-if-true
    ([conditionMode, pointerMode], condition, pointer) => {
      if (this.getParam(condition, conditionMode)) {
        this.instructionPointer = this.getParam(pointer, pointerMode);
        return true;
      }
    },
    // 6: jump-if-false
    ([conditionMode, pointerMode], condition, pointer) => {
      if (!this.getParam(condition, conditionMode)) {
        this.instructionPointer = this.getParam(pointer, pointerMode);
        return true;
      }
    },
    // 7: less-than
    ([aMode, bMode], a, b, dest) => {
      const isLessThan = this.getParam(a, aMode) < this.getParam(b, bMode);
      this.memory[dest] = +isLessThan;
    },
    // 8: equals
    ([aMode, bMode], a, b, dest) => {
      const isEqual = this.getParam(a, aMode) === this.getParam(b, bMode);
      this.memory[dest] = +isEqual;
    },
  ];

  run() {
    this.instructionPointer = 0;
    while (this.runInstruction()) {}
  }

  private getParam(value: number, mode: number) {
    return mode ? value : this.memory[value];
  }

  private runInstruction(): boolean {
    const { opCode, paramModes } = parseInstructionHead(
      this.memory[this.instructionPointer],
    );

    if (opCode === 99) {
      return false;
    }

    const operation = this.operations[opCode];
    const numParams = operation.length - 1;
    const params = this.memory.slice(
      this.instructionPointer + 1,
      this.instructionPointer + numParams + 1,
    );

    const pointerUpdated = operation(paramModes, ...params);

    if (!pointerUpdated) {
      this.instructionPointer += numParams + 1;
    }

    return true;
  }
}

const runIntCode = (memory: Memory, input?: number) => {
  const computer = new IntCodeComputer([...memory], input);
  computer.run();

  return computer;
};

export default runIntCode;
