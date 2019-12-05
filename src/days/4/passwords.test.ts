import test, { Macro } from 'ava';
import { isValidPassword } from './passwords';

const testValidPassword: Macro<[number, boolean]> = (t, password, isValid) => {
  t.is(isValidPassword(password), isValid);
};
testValidPassword.title = (title, password, isValid) =>
  `${password} is ${isValid ? 'valid' : 'invalid'}`;

test(testValidPassword, 111111, true);
test(testValidPassword, 223450, false);
test(testValidPassword, 123789, false);
test(testValidPassword, 246542, false);
