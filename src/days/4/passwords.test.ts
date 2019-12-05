import test, { Macro } from 'ava';
import { isValidPassword } from './passwords';

const testValidPassword: Macro<[number, boolean]> = (t, password, isValid) => {
  t.is(isValidPassword(password, false), isValid);
};
testValidPassword.title = (title, password, isValid) =>
  `${password} is ${isValid ? 'valid' : 'invalid'}`;

test(testValidPassword, 111111, true);
test(testValidPassword, 223450, false);
test(testValidPassword, 123789, false);
test(testValidPassword, 246542, false);

const testValidPasswordWithExactlyPair: Macro<[number, boolean]> = (
  t,
  password,
  isValid,
) => {
  t.is(isValidPassword(password, true), isValid);
};
testValidPasswordWithExactlyPair.title = (title, password, isValid) =>
  `${password} is ${
    isValid ? 'valid' : 'invalid'
  } requiring a run of length 2 exactly`;

test(testValidPasswordWithExactlyPair, 112233, true);
test(testValidPasswordWithExactlyPair, 123444, false);
test(testValidPasswordWithExactlyPair, 111122, true);
