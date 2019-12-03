export const runIntCode = (program: number[]) => {
  let index = 0;
  let done = false;
  let currentProgram: number[] | null = program;

  while (!done) {
    const newProgram = runStep(currentProgram, index);
    currentProgram = newProgram || currentProgram;
    done = !newProgram;
    index += 4;
  }

  return currentProgram;
};

const operations: Record<number, (a: number, b: number) => number> = {
  1: (a, b) => a + b,
  2: (a, b) => a * b,
};

const runStep = (program: number[], index: number): number[] | null => {
  const [opCode, leftAddress, rightAddress, destAddress] = program.slice(index);

  if (opCode === 99) {
    return null;
  }

  const left = program[leftAddress];
  const right = program[rightAddress];
  const operation = operations[opCode];
  const result = operation(left, right);

  const alteredProgram = [...program];
  alteredProgram[destAddress] = result;

  return alteredProgram;
};
