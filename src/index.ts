function getParamType(param: unknown) {
  return Object.prototype.toString.call(param).slice(8, -1);
}

function isObjectEqual(
  a: Record<string, unknown>,
  b: Record<string, unknown>
): boolean {
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!b.hasOwnProperty(key)) {
      return false;
    }

    if (!isEquals(a[key], b[key])) {
      return false;
    }
  }
  return true;
}

function isArrayEqual(a: unknown[], b: unknown[]): boolean {
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (!isEquals(a[i], b[i])) {
      return false;
    }
  }
  return true;
}

function isNumberEqual(a: number, b: number): boolean {
  if (isNaN(a) && isNaN(b)) {
    return true;
  }
  return Number(a) === Number(b);
}

function isDateEqual(a: Date, b: Date): boolean {
  return a.getTime() === b.getTime();
}

export function isEquals(a: any, b: any): boolean {
  const typeA = getParamType(a);
  const typeB = getParamType(b);

  if (typeA !== typeB) {
    return false;
  }

  switch (typeA) {
    case "Object":
      return isObjectEqual(a, b);
    case "Array":
      return isArrayEqual(a, b);
    case "Number":
      return isNumberEqual(a, b);
    case "Date":
      return isDateEqual(a, b);
    default:
      return a === b;
  }
}
