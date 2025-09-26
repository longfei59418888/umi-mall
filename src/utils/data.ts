export const getAllExpandedKeys = <T extends { key: string }>(
  data: Array<T & { children?: T[] }>,
  selectId: string[],
) => {
  const keys: string[] = [];
  data.forEach((item) => {
    if (selectId.includes(item.key)) keys.push(item.key);
    if (item.children) {
      const childrenKey = getAllExpandedKeys(item.children, selectId);
      if (childrenKey.length > 0 && !selectId.includes(item.key))
        keys.push(item.key);
      keys.push(...childrenKey);
    }
  });
  return keys;
};

export const FormatExpandedData = <T extends { parentId: string; id: string }>(
  parentId: string = '0',
  data: T[],
  treeName?: keyof T,
): Array<
  T & {
    children?: T[];
    title?: string;
    value?: string;
    key?: string;
  }
> => {
  return data
    .filter((category) => category.parentId === parentId)
    .map((category) => {
      const children = FormatExpandedData(category.id, data);
      return {
        ...(!!treeName
          ? {
              title: category[treeName] as string,
              value: category.id,
              key: category.id,
            }
          : {}),
        ...category,
        children: children.length > 0 ? children : undefined,
      };
    });
};

export function cartesianProduct(specs: string[][]): string[][] {
  if (specs.length === 0) return [];

  return specs.reduce<string[][]>(
    (acc, cur) => {
      const result: string[][] = [];
      for (const a of acc) {
        for (const b of cur) {
          result.push([...a, b]);
        }
      }
      return result;
    },
    [[]],
  );
}
