import _ from 'lodash';

const parse = (string: string) => string.split(',').map(_.unary(parseInt));

export default parse;
