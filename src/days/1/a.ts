import _ from 'lodash';
import fuelRequired from './fuelRequired';

// https://adventofcode.com/2019/day/1
export default (masses: number[]) => _.sumBy(masses, fuelRequired);
