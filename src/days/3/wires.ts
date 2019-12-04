import _ from 'lodash';
import intCsv from '../../parsers/intCsv';

export type Direction = 'U' | 'D' | 'L' | 'R';
export interface WireMove {
  direction: Direction;
  distance: number;
}
export type WirePath = WireMove[];
export type Point = [number, number];

export const findMinimumIntersectionDistance = (paths: WirePath[]) => {
  const latencyMaps = paths.map(path => {
    const latencyMap = getLatencies(path);
    delete latencyMap['0,0'];

    return latencyMap;
  });

  const commonPoints = _.intersection(...latencyMaps.map(Object.keys));
  const distances = commonPoints.map(point => distance(parsePoint(point)));
  const minDistance = _.min(distances)!;

  return minDistance;
};

export const findMinimumIntersectionLatency = (paths: WirePath[]) => {
  const latencyMaps = paths.map(getLatencies);
  const commonPoints = _.intersection(...latencyMaps.map(Object.keys));

  const latencies = commonPoints.map(point =>
    _.sumBy(latencyMaps, map => map[point]),
  );
  const minLatency = _.min(latencies)!;

  return minLatency;
};

const steps = {
  U: [0, 1],
  D: [0, -1],
  L: [-1, 0],
  R: [1, 0],
};

export const getLatencies = (path: WirePath) => {
  const latencies: Record<string, number> = {};
  let cursor: Point = [0, 0];
  let latency = 1;

  path.forEach(move => {
    const [xStep, yStep] = steps[move.direction];

    for (let i = 0; i < move.distance; i++, latency++) {
      cursor[0] += xStep;
      cursor[1] += yStep;
      const cursorString = stringifyPoint(cursor);
      latencies[cursorString] = latencies[cursorString] || latency;
    }
  });

  return latencies;
};

const stringifyPoint = ([x, y]: Point) => `${x},${y}`;
const parsePoint = (string: string) => intCsv(string) as Point;

const distance = ([x, y]: Point) => Math.abs(x) + Math.abs(y);
