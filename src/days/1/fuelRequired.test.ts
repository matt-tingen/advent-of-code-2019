import test, { Macro } from 'ava';
import fuelRequired from './fuelRequired';

const testFuelRequired: Macro<[number, number]> = (t, mass, fueld) => {
  t.is(fuelRequired(mass), fueld);
};
testFuelRequired.title = (title, mass, fuel) =>
  `${mass} mass requires ${fuel} fuel`;

test(testFuelRequired, 12, 2);
test(testFuelRequired, 14, 2);
test(testFuelRequired, 1969, 654);
test(testFuelRequired, 100756, 33583);
