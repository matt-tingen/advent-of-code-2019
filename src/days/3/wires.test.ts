import test, { Macro } from 'ava';
import { parsePath } from './parse';
import {
  getPassedPoints,
  Point,
  findMinimumIntersectionDistance,
} from './wires';

const testGetPassedPoints: Macro<[string, Point[]]> = (t, path, points) => {
  const actualPoints = getPassedPoints(parsePath(path));

  t.deepEqual(new Set(actualPoints), new Set(points));
  t.is(actualPoints.length, points.length);
};
testGetPassedPoints.title = (title, path, points) =>
  title || `${path} passes through ${JSON.stringify(points)}`;

test(testGetPassedPoints, 'U1', [[0, 1]]);
test(testGetPassedPoints, 'R2', [
  [1, 0],
  [2, 0],
]);
test(testGetPassedPoints, 'R2,L2', [
  [1, 0],
  [2, 0],
  [0, 0],
]);
test(testGetPassedPoints, 'R1,D1', [
  [1, 0],
  [1, -1],
]);

const testMinDistance: Macro<[string[], number]> = (t, paths, distance) => {
  t.is(findMinimumIntersectionDistance(paths.map(parsePath)), distance);
};
testMinDistance.title = (title, paths, distance) =>
  title || `${JSON.stringify(paths)} cross at a min distance of ${distance}`;

test(testMinDistance, ['R8,U5,L5,D3', 'U7,R6,D4,L4'], 6);
test(
  testMinDistance,
  ['R75,D30,R83,U83,L12,D49,R71,U7,L72', 'U62,R66,U55,R34,D71,R55,D58,R83'],
  159,
);
test(
  testMinDistance,
  [
    'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51',
    'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7',
  ],
  135,
);
