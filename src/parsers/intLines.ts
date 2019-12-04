import _ from 'lodash';

const intLines = (string: string) => string.split('\n').map(_.unary(parseInt));

export default intLines;
