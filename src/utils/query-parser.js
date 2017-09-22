import { parse } from 'qs';
import queryType from 'query-types';

const parser = query => {
  const queryObject = parse(query);
  return queryType.parseObject(queryObject);
};

export default parser;
