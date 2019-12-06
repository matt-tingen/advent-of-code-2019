const prepareMemory = (memory: number[], noun: number, verb: number) => {
  const preparedMemory = [...memory];
  preparedMemory[1] = noun;
  preparedMemory[2] = verb;

  return preparedMemory;
};

export default prepareMemory;
