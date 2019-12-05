import { isValidPassword } from './passwords';

// https://adventofcode.com/2019/day/4
export default ([min, max]: [number, number]) => {
  let numValidPasswords = 0;

  for (let i = min; i <= max; i++) {
    if (isValidPassword(i)) {
      numValidPasswords++;
    }
  }

  return numValidPasswords;
};
