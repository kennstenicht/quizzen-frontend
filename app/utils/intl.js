// Options:
// silent (bool or string) - Does not raise missing translation
// append - string to append to the path (without .)
export function lookupTranslation(lookups, options = {}) {
  // Append
  if (options.append) {
    lookups = lookups.map((path) => `${path}.${options.append}`);
  }

  let path = lookups.find((path) => this.intl.exists(path));

  // Silently fail
  let silent = options.silent;
  if (silent && !path) {
    if (typeof silent === 'string') {
      return silent;
    }
    return;
  }

  // Use the first path for the error message
  return this.intl.t(path || lookups[0]);
}


export function translate(value, lookups, options) {
  if (value === false) {
    return;
  }

  if (value) {
    return value;
  }

  return lookupTranslation.call(this, lookups, options);
}


export function labelValueOptions(values, attribute, lookups) {
  return values.map((value) => {
    let append = `${attribute}.${value}`;
    let label = lookupTranslation(this.intl, lookups, { append });
    return { value, label };
  });
}
