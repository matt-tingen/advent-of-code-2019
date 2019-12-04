import _ from 'lodash';

export type Direction = 'U' | 'D' | 'L' | 'R';
export interface WireMove {
  direction: Direction;
  distance: number;
}
export type WirePath = WireMove[];
export type Point = [number, number];

export const findMinimumIntersectionDistance = (paths: WirePath[]) => {
  const passedPoints = paths.map(getPassedPoints);
  const commonPoints = _.intersectionBy(...passedPoints, stringifyPoint);
  // Ignore [0, 0]
  const distances = commonPoints.map(point => distance(point) || Infinity);
  const minDistance = _.min(distances)!;

  return minDistance;
};

const steps = {
  U: [0, 1],
  D: [0, -1],
  L: [-1, 0],
  R: [1, 0],
};

export const getPassedPoints = (path: WirePath): Point[] => {
  const points: Point[] = [];
  let cursor: Point = [0, 0];

  path.forEach(move => {
    const [xStep, yStep] = steps[move.direction];

    for (let i = 0; i < move.distance; i++) {
      cursor[0] += xStep;
      cursor[1] += yStep;
      points.push([...cursor] as Point);
    }
  });

  return _.uniqBy(points, stringifyPoint);
};

const stringifyPoint = ([x, y]: Point) => `${x},${y}`;

const distance = ([x, y]: Point) => Math.abs(x) + Math.abs(y);
