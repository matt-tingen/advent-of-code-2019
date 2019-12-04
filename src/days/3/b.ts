import _ from 'lodash';
import { findMinimumIntersectionLatency, WirePath } from './wires';

// https://adventofcode.com/2019/day/3#part2
export default (paths: WirePath[]) => {
  const distance = findMinimumIntersectionLatency(paths);

  return distance;
};
