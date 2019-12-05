export const isValidPassword = (password: number) => {
  const [head, ...tail] = password.toString().split('');

  let prev = head;
  let foundAdjacentRepeat = false;

  for (let digit of tail) {
    if (digit < prev) {
      return false;
    }

    if (digit === prev) {
      foundAdjacentRepeat = true;
    }

    prev = digit;
  }

  return foundAdjacentRepeat;
};
