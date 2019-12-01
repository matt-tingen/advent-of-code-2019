import test, { Macro } from 'ava';
import { fuelRequired, fuelRequiredRecursive } from './fuelRequired';

const testFuelRequired: Macro<[number, number]> = (t, mass, fueld) => {
  t.is(fuelRequired(mass), fueld);
};
testFuelRequired.title = (title, mass, fuel) =>
  `${mass} mass requires ${fuel} fuel`;

test(testFuelRequired, 12, 2);
test(testFuelRequired, 14, 2);
test(testFuelRequired, 1969, 654);
test(testFuelRequired, 100756, 33583);

const testFuelRequiredRecursive: Macro<[number, number]> = (t, mass, fueld) => {
  t.is(fuelRequiredRecursive(mass), fueld);
};
testFuelRequiredRecursive.title = (title, mass, fuel) =>
  `${mass} mass requires ${fuel} fuel when accounting for fuel mass`;

test(testFuelRequiredRecursive, 14, 2);
test(testFuelRequiredRecursive, 1969, 966);
test(testFuelRequiredRecursive, 100756, 50346);
