import _ from 'lodash';

const parseIntCsv = (string: string) =>
  string.split(',').map(_.unary(parseInt));

export default parseIntCsv;
