type Memory = number[];

type Operations = Record<number, (...params: number[]) => void>;

class IntCodeComputer {
  constructor(public memory: Memory) {}

  private operations: Operations = {
    1: (a, b, dest) => {
      this.memory[dest] = this.memory[a] + this.memory[b];
    },
    2: (a, b, dest) => {
      this.memory[dest] = this.memory[a] * this.memory[b];
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

  private runInstruction(instructionPointer: number): number {
    const opCode = this.memory[instructionPointer];

    if (opCode === 99) {
      return 0;
    }

    const operation = this.operations[opCode];
    const numParams = operation.length;
    const params = this.memory.slice(
      instructionPointer + 1,
      instructionPointer + numParams + 1,
    );

    operation(...params);

    return numParams + 1;
  }
}

const runIntCode = (memory: Memory) => {
  const computer = new IntCodeComputer(memory);
  computer.run();
  return computer.memory;
};

export default runIntCode;
