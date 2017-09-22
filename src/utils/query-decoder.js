const decoder = x => {
  if (x === 'true') {
    return true;
  }
  else if (x === 'false') {
    return false;
  }
  return decodeURIComponent(x);
};

export default decoder;
