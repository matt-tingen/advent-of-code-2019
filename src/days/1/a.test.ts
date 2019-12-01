import test, { Macro } from 'ava';
import solve from './a';

const test1A: Macro<[number[], number]> = (t, masses, fuel) => {
  t.is(solve(masses), fuel);
};
test1A.title = (title, mass, fuel) =>
  `${JSON.stringify(mass)} masses requires ${fuel} fuel`;

test(test1A, [12, 14, 1969, 100756], 2 + 2 + 654 + 33583);
