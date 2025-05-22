/**
 * https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore?tab=readme-ov-file#_flatten
 * https://github.com/you-dont-need-x/you-dont-need-lodash
 */

// ----------------------------------------------------------------------

export function flattenArray<T>(list: T[], key = 'children'): T[] {
  let children: T[] = [];

  const flatten = list?.map((item: any) => {
    if (item[key] && item[key].length) {
      children = [...children, ...item[key]];
    }
    return item;
  });

  return flatten?.concat(children.length ? flattenArray(children, key) : children);
}

// ----------------------------------------------------------------------

export function flattenDeep(array: any): any[] {
  const isArray = array && Array.isArray(array);

  if (isArray) {
    return array.flat(Infinity);
  }
  return [];
}

// ----------------------------------------------------------------------

export function orderBy<T>(array: T[], properties: (keyof T)[], orders?: ('asc' | 'desc')[]): T[] {
  return array.slice().sort((a, b) => {
    for (let i = 0; i < properties.length; i += 1) {
      const property = properties[i];
      const order = orders && orders[i] === 'desc' ? -1 : 1;

      const aValue = a[property];
      const bValue = b[property];

      if (aValue < bValue) return -1 * order;
      if (aValue > bValue) return 1 * order;
    }
    return 0;
  });
}

// ----------------------------------------------------------------------

export function keyBy<T>(
  array: T[],
  key: keyof T
): {
  [key: string]: T;
} {
  return (array || []).reduce((result, item) => {
    const keyValue = key ? item[key] : item;

    return { ...result, [String(keyValue)]: item };
  }, {});
}

// ----------------------------------------------------------------------

export function sumBy<T>(array: T[], iteratee: (item: T) => number): number {
  return array.reduce((sum, item) => sum + iteratee(item), 0);
}

// ----------------------------------------------------------------------

export function isEqual(a: any, b: any): boolean {
  if (a === null || a === undefined || b === null || b === undefined) {
    return a === b;
  }

  if (typeof a !== typeof b) {
    return false;
  }

  if (typeof a === 'string' || typeof a === 'number' || typeof a === 'boolean') {
    return a === b;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }

    return a.every((item, index) => isEqual(item, b[index]));
  }

  if (typeof a === 'object' && typeof b === 'object') {
    const keysA = Object.keys(a!);
    const keysB = Object.keys(b!);

    if (keysA.length !== keysB.length) {
      return false;
    }

    return keysA.every((key) => isEqual(a[key], b[key]));
  }

  return false;
}

// ----------------------------------------------------------------------
export function splitArray(data: any[], chunkSize: number) {
  const result: any[] = [];

  data.forEach((_, index) => {
    // If the index is divisible by chunkSize, start a new chunk
    if (index % chunkSize === 0) {
      result.push(data.slice(index, index + chunkSize)); // Slice the array into chunks
    }
  });

  return result;
}

// ----------------------------------------------------------------------

function isObject(item: any) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

export const merge = (target: any, ...sources: any[]): any => {
  if (!sources.length) return target;

  const source = sources.shift();

  // eslint-disable-next-line no-restricted-syntax
  for (const key in source) {
    if (isObject(source[key])) {
      if (!target[key]) Object.assign(target, { [key]: {} });
      merge(target[key], source[key]);
    } else {
      Object.assign(target, { [key]: source[key] });
    }
  }

  return merge(target, ...sources);
};

export const formatID = (id: string | number, prefix: string = 'M', length = 7) =>
  `${prefix}-${id.toString().padStart(length, '0')}`;

export const isValidUrl = (str: string) => {
  try {
    const url = new URL(str); // If it's a valid URL, this won't throw

    console.log('url => ', url);
    return true;
  } catch {
    return false; // Throws if it's not a valid URL
  }
};

export function canConvertToNumber(value: string): boolean {
  // Trim the string to handle any leading or trailing spaces
  const trimmedValue = value.trim();

  // Check if the trimmed value is a valid number
  return !Number.isNaN(trimmedValue);
}

export const customizeFullName = (fullName: string) => {
  const [firstName, lastName] = fullName ? fullName.split(' ').filter(Boolean) : ['', ''];

  return `${firstName} ${lastName?.length ? `${lastName[0].toUpperCase()}.` : ''}`;
};

export const generateRandomString = (length: number = 8): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  const charactersLength = characters.length;

  for (let i = 0; i < length; i += 1) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result;
};

export const fetchXmlData = async (url: string) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/Xml',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const xmlText = await response.text();

  // Parse XMl using DOMParse
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'application/xml');

  return xmlDoc;
};

export const cutString = (text: string, length: number) => {
  if (text.length > length) {
    return `${text.substring(0, length)}...`;
  }

  return text;
};

export const makeDecimal = (value: number, length: number): string => {
  if (Number.isInteger(value)) {
    return `${value}.${'0'.repeat(length)}`;
  }

  return value.toString();
};

export const isTransaction = (link: string, linkType: string) => {
  switch (linkType) {
    case 'TXC':
      return link.length === 64; // TXC transactions are 64 characters long
    case 'BTC':
      return link.length === 64; // BTC transactions are 64 characters long
    case 'ETH':
      return link.startsWith('0x') && link.length === 66; // ETH transactions are 66 chars, starting with '0x'
    case 'TRN':
      return link.length === 64; // TRX transactions are 64 characters long
    case 'HASH':
      console.log('link => ', link.includes('S'));
      return link.includes('S');
    case 'SALE':
      return link.includes('S');
    case 'OTHER':
      return link.length === 64 || (link.startsWith('0x') && link.length === 66); // Other transactions are 64 characters long
    default:
      return false; // Default to address for unsupported link types
  }
};
