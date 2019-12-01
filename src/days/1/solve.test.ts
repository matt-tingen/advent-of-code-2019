import test, { Macro } from 'ava';
import solve from './solve';

const testSolve: Macro<[(mass: number) => number, number[], number]> = (
  t,
  iteree,
  masses,
  fuel,
) => {
  t.is(solve(iteree)(masses), fuel);
};
testSolve.title = title => `solves with ${title} iteree`;

test(
  'identity',
  testSolve,
  mass => mass,
  [12, 14, 1969, 100756],
  12 + 14 + 1969 + 100756,
);

test(
  'doubling',
  testSolve,
  mass => mass * 2,
  [12, 14, 1969, 100756],
  2 * (12 + 14 + 1969 + 100756),
);
