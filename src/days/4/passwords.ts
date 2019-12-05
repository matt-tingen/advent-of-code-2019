export const isValidPassword = (
  password: number,
  requireExactlyPair: boolean,
) => {
  const [head, ...tail] = password.toString().split('');

  let prev = head;
  let foundPair = false;
  let runLength = 1;

  const checkRun = (length: number) => {
    if (length > 1 && (length === 2 || !requireExactlyPair)) {
      foundPair = true;
    }
  };

  for (let digit of tail) {
    if (digit < prev) {
      return false;
    }

    if (digit === prev) {
      runLength++;
    } else {
      checkRun(runLength);
      runLength = 1;
    }

    prev = digit;
  }

  checkRun(runLength);

  return foundPair;
};
