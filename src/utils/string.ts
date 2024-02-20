const MULTI_SPACES = () => {
  return new RegExp(/\s{2,}/, 'gi')
}
const SPECIAL_CHARACTERS_EXL_SPACES_REGEX = () => {
  return new RegExp(/[^A-Za-z0-9 ]/, 'gi')
}

export const slugifyBrand = function (name: string): string {
  return name
    .replace(SPECIAL_CHARACTERS_EXL_SPACES_REGEX(), '')
    .replace(MULTI_SPACES(), ' ')
    .toLowerCase()
}

export const capitalize = function (str: string): string {
  str = str || ''

  return `${str.substring(0, 1).toUpperCase()}${str
    .substring(1, str.length)
    .toLowerCase()}`
    .replace(/_/gi, ' ')
    .split(' ')
    .map((part) => _capitalize(part))
    .join(' ')
}

function _capitalize(str: string): string {
  str = str || ''

  return `${str.substring(0, 1).toUpperCase()}${str
    .substring(1, str.length)
    .toLowerCase()}`
}
