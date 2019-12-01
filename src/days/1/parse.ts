import _ from 'lodash';

const parse = (string: string) => string.split('\n').map(_.unary(parseInt));

export default parse;
