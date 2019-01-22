export const buildQuery = (...query) => {
  const fullQuery = [];
  if (query) {
    for (let i = 0; i < query.length; i++) fullQuery.push(query[i]);
  }

  if (fullQuery.length === 0) return;
  return `${fullQuery.join("&")}`;
};
