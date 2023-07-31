export function arrayToMapByKey<T extends object>(
  arr: T[],
  keyProp: keyof Partial<T>
): Map<string, T> {
  const map = new Map();
  arr?.forEach((elem) => {
    let key: any = elem[keyProp];
    map.set(key.toString(), elem);
  });
  return map;
}
