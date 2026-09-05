export const pickFields = (source = {}, allowed = []) => {
  const picked = {};
  for (const field of allowed) {
    if (source[field] !== undefined) picked[field] = source[field];
  }
  return picked;
};

export default pickFields;