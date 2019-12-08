import { write as copy } from 'clipboardy';
import { getSolver, getLatestChallenge } from './run';

const specifierRegex = /^(\d+)([ab]?)$/;

const processArgs = ([specifier]: string[]) => {
  const match = specifier && specifier.match(specifierRegex);

  if (specifier && !match) {
    throw new Error('Invalid specifier');
  }

  return match ? match.slice(1) : [];
};

const main = async () => {
  const args = processArgs(process.argv.slice(2));
  const [day, part] = await getLatestChallenge(...args);
  const solver = await getSolver(day, part);

  console.time('solve');
  const result = solver();
  console.timeEnd('solve');

  console.log(`Result for day ${day}${part} (copied to clipboard)`);
  console.log(result);
  copy(result.toString());
};

main();
