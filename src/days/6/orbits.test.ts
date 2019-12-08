import _ from 'lodash';
import test from 'ava';
import { buildOrbitTree, countOrbits } from './orbits';

test('buildOrbitTree builds a two-body tree', t => {
  const com = buildOrbitTree([['COM', 'A']]);

  t.is(com.name, 'COM');
  t.falsy(com.primary);
  t.is(_.size(com.satellites), 1);

  const a = com.satellites.A;
  t.is(a.name, 'A');
  t.is(a.primary, com);
  t.true(_.isEmpty(a.satellites));
});

/**
 *         C
 *        /
 * COM - A - B
 *        \   \
 *         D   E
 */
test('buildOrbitTree builds a branching tree', t => {
  const com = buildOrbitTree([
    ['COM', 'A'],
    ['A', 'B'],
    ['A', 'C'],
    ['A', 'D'],
    ['B', 'E'],
  ]);

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

test('countOrbits counts a one-body tree', t => {
  const com = buildOrbitTree([['COM', 'A']]);

  const numOrbits = countOrbits(com);
  t.is(numOrbits, 1);
});

test('countOrbits counts a split tree', t => {
  const com = buildOrbitTree([
    ['COM', 'A'],
    ['COM', 'B'],
  ]);

  const numOrbits = countOrbits(com);
  t.is(numOrbits, 2);
});

test('countOrbits counts a chain', t => {
  const com = buildOrbitTree([
    ['COM', 'A'],
    ['A', 'B'],
  ]);

  const numOrbits = countOrbits(com);
  t.is(numOrbits, 3);
});

test('countOrbits counts a branching tree', t => {
  const com = buildOrbitTree([
    ['COM', 'A'],
    ['A', 'B'],
    ['A', 'C'],
    ['A', 'D'],
    ['B', 'E'],
  ]);

  const numOrbits = countOrbits(com);
  t.is(numOrbits, 10);
});

test('countOrbits counts a complex tree', t => {
  const com = buildOrbitTree([
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
  ]);

  const numOrbits = countOrbits(com);
  t.is(numOrbits, 42);
});
