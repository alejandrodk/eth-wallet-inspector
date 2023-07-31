export const buildUrl = (
  path: string,
  query = {} as Record<string, string | string[] | number | boolean | undefined>
) => {
  const params = Object.entries(query).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== "") {
      acc[key] = value.toString?.() ?? value;
    }
    return acc;
  }, {} as Record<string, string>);

  const queryString = query ? `?${new URLSearchParams(params).toString()}` : "";
  return `${path}${queryString}`;
};
