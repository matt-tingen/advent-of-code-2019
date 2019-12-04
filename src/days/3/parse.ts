import _ from 'lodash';
import { WirePath, Direction } from './wires';

const parseMove = (move: string) => ({
  direction: move[0] as Direction,
  distance: parseInt(move.slice(1)),
});

export const parsePath = (row: string) => row.split(',').map(parseMove);

const parse = (string: string): WirePath[] => string.split('\n').map(parsePath);

export default parse;
