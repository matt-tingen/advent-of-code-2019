import { isValidPassword } from './passwords';

export default (requireExactlyPair: boolean) => ([min, max]: [
  number,
  number,
]) => {
  let numValidPasswords = 0;

  for (let i = min; i <= max; i++) {
    if (isValidPassword(i, requireExactlyPair)) {
      numValidPasswords++;
    }
  }

  return numValidPasswords;
};
