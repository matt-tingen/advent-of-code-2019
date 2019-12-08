import { promises as fs } from 'fs';
import path from 'path';
import _ from 'lodash';

type Parser = (input: string) => unknown;
type Solver = (input: unknown) => string | number;

const DAYS_DIR = path.join(__dirname, 'days');

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

const PART_FILENAMES = ['b.ts', 'a.ts'];

const getLatestPart = async (dayDir: string) => {
  const files = new Set(await fs.readdir(dayDir));
  const filename = PART_FILENAMES.find(part => files.has(part));

  return filename && path.basename(filename, '.ts');
};

const getParsedInput = async (dayDir: string) => {
  const inputString = await getInput(dayDir);
  const parse = getParser(dayDir) as Parser;
  const input = parse(inputString);

  return input;
};

export const getLatestChallenge = async (dayArg?: string, partArg?: string) => {
  const day = dayArg || (await getLatestDay());

  if (!day) {
    throw new Error('Missing day');
  }

  const dayDir = path.join(DAYS_DIR, day);
  const part = partArg || (await getLatestPart(dayDir));

  if (!part) {
    throw new Error('Missing part');
  }

  return [day, part] as [string, string];
};

export const getSolver = async (day: string | number, part: string) => {
  const dayDir = path.join(DAYS_DIR, day.toString());
  const partPath = path.join(dayDir, part);
  const solve = require(partPath).default as Solver;
  const input = await getParsedInput(dayDir);

  return () => solve(input);
};
