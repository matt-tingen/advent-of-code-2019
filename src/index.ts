import { write as copy } from 'clipboardy';
import { promises as fs } from 'fs';
import _ from 'lodash';
import path from 'path';
import process from 'process';

type Parser = (input: string) => unknown;
type Solver = (input: unknown) => string | number;

const DAYS_DIR = path.join(__dirname, 'days');

const specifierRegex = /^(\d+)([ab]?)$/;

const processArgs = ([specifier]: string[]) => {
  const match = specifier && specifier.match(specifierRegex);

  if (specifier && !match) {
    throw new Error('Invalid specifier');
  }

  return match ? match.slice(1) : [];
};

const getInput = async (dir: string) => {
  const buffer = await fs.readFile(path.join(dir, 'input.txt'));
  return buffer.toString().trim();
};

const getParser = (dir: string): ((input: string) => unknown) => {
  try {
    return require(path.join(dir, 'parse.ts')).default;
  } catch (e) {
    return input => input;
  }
};

const isDirectory = async (source: string) => {
  const stats = await fs.lstat(source);
  return stats.isDirectory();
};

const getDirectories = async (source: string) => {
  const dirs = await fs.readdir(source);

  return dirs
    .map(name => path.join(source, name))
    .filter(isDirectory)
    .map(dir => path.basename(dir));
};

const getLatestDay = async () => {
  const dirs = await getDirectories(DAYS_DIR);

  if (!dirs.length) {
    throw new Error('No directories found');
  }

  const dir = _.maxBy(dirs, _.unary(parseInt));

  return dir;
};

const CHALLENGES = ['b.ts', 'a.ts'];

const getLatestChallenge = async (dayDir: string) => {
  const files = new Set(await fs.readdir(dayDir));

  return CHALLENGES.find(challenge => files.has(challenge));
};

const getResult = async (solve: Solver, dayDir: string) => {
  const inputString = await getInput(dayDir);
  const parse = getParser(dayDir) as Parser;
  const input = parse(inputString);
  const result = solve(input);

  return result;
};

const run = async (dayArg?: string, challengeArg?: string) => {
  const day = dayArg || (await getLatestDay());

  if (!day) {
    throw new Error('Missing day');
  }

  const dayDir = path.join(DAYS_DIR, day);

  const challengeFilename = challengeArg || (await getLatestChallenge(dayDir));

  if (!challengeFilename) {
    throw new Error('Missing challenge');
  }

  const challenge = path.basename(challengeFilename, '.ts');
  const challengePath = path.join(dayDir, challengeFilename);

  const solve = require(challengePath).default as Solver;
  const result = await getResult(solve, dayDir);

  console.log(`Result for day ${day}${challenge} (copied to clipboard)`);
  console.log(result);
  copy(result.toString());
};

const args = processArgs(process.argv.slice(2));
run(...args);
