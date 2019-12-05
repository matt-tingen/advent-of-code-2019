import _ from 'lodash';

const parseIntLines = (string: string) =>
  string.split('\n').map(_.unary(parseInt));

export default parseIntLines;
