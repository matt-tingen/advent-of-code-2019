import runIntCode from '../../runIntCode';

// https://adventofcode.com/2019/day/5
export default (memory: number[]) => {
  const { outputs } = runIntCode(memory, 1);
  const testResults = outputs.slice(0, -1);

  if (!testResults.every(result => result === 0)) {
    throw new Error('Failed diagnostics');
  }

  const diagnosticCode = outputs[outputs.length - 1];

  return diagnosticCode;
};
