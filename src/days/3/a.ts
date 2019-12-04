import _ from 'lodash';
import { findMinimumIntersectionDistance, WirePath } from './wires';

// https://adventofcode.com/2019/day/3
export default (paths: WirePath[]) => {
  const distance = findMinimumIntersectionDistance(paths);

  return distance;
};
