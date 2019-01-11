export const buildQuery = (query) => {
  const fullQuery = [];
  if (query) fullQuery.push(query);
  if (fullQuery.length === 0) return;
  return `${fullQuery.join("&")}`;
};
