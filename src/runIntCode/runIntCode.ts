const runIntCode = (initialMemory: number[]) => {
  let instructionPointer = 0;
  let done = false;
  let currentMemory: number[] | null = initialMemory;

  while (!done) {
    const newMemory = runInstruction(currentMemory, instructionPointer);
    currentMemory = newMemory || currentMemory;
    done = !newMemory;
    instructionPointer += 4;
  }

  return currentMemory;
};

const operations: Record<number, (a: number, b: number) => number> = {
  1: (a, b) => a + b,
  2: (a, b) => a * b,
};

const runInstruction = (
  memory: number[],
  instructionPointer: number,
): number[] | null => {
  const [opCode, leftAddress, rightAddress, destAddress] = memory.slice(
    instructionPointer,
  );

  if (opCode === 99) {
    return null;
  }

  const left = memory[leftAddress];
  const right = memory[rightAddress];
  const operation = operations[opCode];
  const result = operation(left, right);

  const alteredMemory = [...memory];
  alteredMemory[destAddress] = result;

  return alteredMemory;
};

export default runIntCode;
