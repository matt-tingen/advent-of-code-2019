import _ from 'lodash';

const intCsv = (string: string) => string.split(',').map(_.unary(parseInt));

export default intCsv;
