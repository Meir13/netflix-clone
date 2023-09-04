export const getFilterUrl = (filter) => {
  return filter.query ? `q=${filter.query}` : "";
};
