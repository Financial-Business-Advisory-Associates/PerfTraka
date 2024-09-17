export function isEmptyObject(obj: object): boolean {
  return Object.keys(obj).length === 0;
}

// type OverpostedObject<T> = T & { [key: string]: any };

// export function pickPropertyValues<T>(
//   sourceObj: OverpostedObject<T>,
//   destinationObj: T
// ): T {
//   const keys: (keyof T)[] = Object.keys(destinationObj) as (keyof T)[];

//   return keys.reduce((acc, key) => {
//     if (sourceObj.hasOwnProperty(key)) {
//       // Type assertions to ensure type safety
//       (acc as any)[key] = (sourceObj as any)[key];
//     }
//     return acc;
//   }, destinationObj) as T; // Type assertion to specify the return type
// }

type OverpostedObject<T> = T & { [key: string]: any };

export function pickPropertyValues<T extends object>(
  sourceObj: OverpostedObject<T>,
  destinationObj: T
): T {
  const keys: (keyof T)[] = Object.keys(destinationObj) as (keyof T)[];

  return keys.reduce((acc, key) => {
    if (sourceObj.hasOwnProperty(key)) {
      (acc as any)[key] = (sourceObj as any)[key];
    }
    return acc;
  }, destinationObj) as T;
}

export function splitUrl(url: string, delimiter: string): string[] {
  let split = url?.split(delimiter);
  return split;
}
