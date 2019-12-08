import _ from 'lodash';
import test, { Macro } from 'ava';
import { buildOrbitTree, countOrbits, Orbit, calcDistance } from './orbits';

/**
 * COM - A
 */
const twoBodyOrbits: Orbit[] = [['COM', 'A']];

/**
 *      B
 *     /
 * COM - A
 */
const splitTreeOrbits: Orbit[] = [
  ['COM', 'A'],
  ['COM', 'B'],
];

/**
 * COM - A - B
 */
const chainOrbits: Orbit[] = [
  ['COM', 'A'],
  ['A', 'B'],
];

/**
 *         C
 *        /
 * COM - A - B
 *        \   \
 *         D   E
 */
const branchingTreeOrbits: Orbit[] = [
  ['COM', 'A'],
  ['A', 'B'],
  ['A', 'C'],
  ['A', 'D'],
  ['B', 'E'],
];

/**
 *         G - H       J - K - L
 *        /           /
 * COM - B - C - D - E - F
 *                \
 *                 I
 */
const complexTreeOrbits: Orbit[] = [
  ['COM', 'B'],
  ['B', 'C'],
  ['C', 'D'],
  ['D', 'E'],
  ['E', 'F'],
  ['B', 'G'],
  ['G', 'H'],
  ['D', 'I'],
  ['E', 'J'],
  ['J', 'K'],
  ['K', 'L'],
];

test('buildOrbitTree builds a two-body tree', t => {
  const { com } = buildOrbitTree(twoBodyOrbits);

  t.is(com.name, 'COM');
  t.falsy(com.primary);
  t.is(_.size(com.satellites), 1);

  const a = com.satellites.A;
  t.is(a.name, 'A');
  t.is(a.primary, com);
  t.true(_.isEmpty(a.satellites));
});

test('buildOrbitTree builds a branching tree', t => {
  const { com } = buildOrbitTree(branchingTreeOrbits);

  t.is(_.size(com.satellites), 1);

  const a = com.satellites.A;
  t.is(a.name, 'A');
  t.is(_.size(a.satellites), 3);
  t.true('B' in a.satellites);
  t.true('C' in a.satellites);
  t.true('D' in a.satellites);

  const b = a.satellites.B;
  t.is(b.primary, a);
  t.is(_.size(b.satellites), 1);

  const e = b.satellites.E;
  t.is(e.name, 'E');
});

const testCountOrbits: Macro<[Orbit[], number]> = (t, orbits, numOrbits) => {
  const { com } = buildOrbitTree(orbits);

  t.is(countOrbits(com), numOrbits);
};
testCountOrbits.title = title => `counts orbits in ${title}`;

test('one-body tree', testCountOrbits, twoBodyOrbits, 1);
test('split tree', testCountOrbits, splitTreeOrbits, 2);
test('chain', testCountOrbits, chainOrbits, 3);
test('branching tree', testCountOrbits, branchingTreeOrbits, 10);
test('complex tree', testCountOrbits, complexTreeOrbits, 42);

const testCalcDistance: Macro<[Orbit[], string, string, number]> = (
  t,
  orbits,
  sourceName,
  destName,
  distance,
) => {
  const { bodies } = buildOrbitTree(orbits);
  const source = bodies[sourceName];
  const dest = bodies[destName];
  t.is(calcDistance(source, dest), distance);
};
testCalcDistance.title = (title, orbits, src, dest, distance) =>
  `measures distance of ${distance} between ${src} and ${dest} in ${title}`;

test('two body tree', testCalcDistance, twoBodyOrbits, 'COM', 'A', 1);
test('two body tree (reverse)', testCalcDistance, twoBodyOrbits, 'A', 'COM', 1);
test('split tree', testCalcDistance, splitTreeOrbits, 'A', 'B', 2);
test('branching tree', testCalcDistance, branchingTreeOrbits, 'D', 'E', 3);
test('complex tree', testCalcDistance, complexTreeOrbits, 'K', 'I', 4);
