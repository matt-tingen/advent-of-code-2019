type Memory = number[];

const operations: Record<number, (a: number, b: number) => number> = {
  1: (a, b) => a + b,
  2: (a, b) => a * b,
};

class IntCodeComputer {
  constructor(public memory: Memory) {}

  run() {
    let instructionPointer = 0;
    let opCode: number = -1;

    while (opCode !== 99) {
      const [opCode_, increment] = this.runInstruction(instructionPointer);
      opCode = opCode_;
      instructionPointer += increment;
    }
  }

  private runInstruction(instructionPointer: number): [number, number] {
    const [opCode, leftAddress, rightAddress, destAddress] = this.memory.slice(
      instructionPointer,
    );

    if (opCode === 99) {
      return [opCode, 0];
    }

    const left = this.memory[leftAddress];
    const right = this.memory[rightAddress];
    const operation = operations[opCode];
    const result = operation(left, right);

    this.memory[destAddress] = result;

    return [opCode, 4];
  }
}

const runIntCode = (memory: Memory) => {
  const computer = new IntCodeComputer(memory);
  computer.run();
  return computer.memory;
};

export default runIntCode;
