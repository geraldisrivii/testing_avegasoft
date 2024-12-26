export function commaSeparated(
  input: number | string | null | undefined
): string {
  const str: string =
    typeof input === 'number' || typeof input === 'string' ? String(input) : ''

  if (str) {
    return str.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
  } else {
    return ''
  }
}

