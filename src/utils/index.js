export const buildQuery = (query, limit) => {
  const fullQuery = [];
  if (query) fullQuery.push(query);
  if (limit) fullQuery.push(`limit=${limit}`);
  if (fullQuery.length === 0) return;
  return `?${fullQuery.join("&")}`;
};
