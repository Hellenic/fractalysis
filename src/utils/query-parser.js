import { parse } from 'qs';
import queryType from 'query-types';

// Parser utility that also parses 'true' and 'false' to booleans, qs does not do this by default
const parser = query => {
  const queryObject = parse(query);
  return queryType.parseObject(queryObject);
};

export default parser;
