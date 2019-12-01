import _ from 'lodash';

export default (calcFuel: (mass: number) => number) => (masses: number[]) =>
  _.sumBy(masses, calcFuel);
