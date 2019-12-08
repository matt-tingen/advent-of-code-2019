import test, { Macro } from 'ava';
import { getSolver } from './run';

const testChallenge: Macro<[number, 'a' | 'b']> = async (t, day, part) => {
  const solver = await getSolver(day, part);
  const result = solver();
  t.snapshot(result, 'Result');
};

testChallenge.title = (title, day, part) => `Challenge ${day}${part}`;

test(testChallenge, 1, 'a');
test(testChallenge, 1, 'b');
test(testChallenge, 2, 'a');
test(testChallenge, 2, 'b');
test(testChallenge, 3, 'a');
test(testChallenge, 3, 'b');
test(testChallenge, 4, 'a');
test(testChallenge, 4, 'b');
test(testChallenge, 5, 'a');
test(testChallenge, 5, 'b');
test(testChallenge, 6, 'a');
test(testChallenge, 6, 'b');
