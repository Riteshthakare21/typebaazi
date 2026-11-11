/**
 * Standard Devanagari Inscript Keyboard Mapping (Certified by Indian Bureau of Standards)
 * Maps physical keyboard keys (QWERTY layout) to authentic Inscript Unicode characters.
 * Enables both native Indic OS input and hardware QWERTY transliteration.
 */

export const INSCRIPT_MAP: Record<string, string> = {
  // Number row (normal & shifted)
  '`': '`', '~': '~',
  '1': '१', '!': '!',
  '2': '२', '@': '@',
  '3': '३', '#': '#',
  '4': '४', '$': '$',
  '5': '५', '%': '%',
  '6': '६', '^': '^',
  '7': '७', '&': '&',
  '8': '८', '*': '*',
  '9': '९', '(': '(',
  '0': '०', ')': ')',
  '-': '-', '_': '_',
  '=': '=', '+': '+',

  // QWERTY Top Row (normal & shifted)
  'q': 'ौ', 'Q': 'औ',
  'w': 'ै', 'W': 'ऐ',
  'e': 'ा', 'E': 'आ',
  'r': 'ी', 'R': 'ई',
  't': 'ू', 'T': 'ऊ',
  'y': 'ब', 'Y': 'भ',
  'u': 'ह', 'U': 'ङ',
  'i': 'ग', 'I': 'घ',
  'o': 'द', 'O': 'ध',
  'p': 'ज', 'P': 'झ',
  '[': 'ड', '{': 'ढ',
  ']': '़', '}': 'ञ',
  '\\': '\\', '|': '|',

  // ASDF Home Row (normal & shifted)
  'a': 'ो', 'A': 'ओ',
  's': 'े', 'S': 'ए',
  'd': '्', 'D': 'अ',
  'f': 'ि', 'F': 'इ',
  'g': 'ु', 'G': 'उ',
  'h': 'प', 'H': 'फ',
  'j': 'र', 'J': 'ऱ',
  'k': 'क', 'K': 'ख',
  'l': 'त', 'L': 'थ',
  ';': 'च', ':': 'छ',
  "'": 'ट', '"': 'ठ',

  // ZXCV Bottom Row (normal & shifted)
  'z': 'ं', 'Z': 'ॅ',
  'x': 'ं', 'X': 'ॉ',
  'c': 'म', 'C': 'ण',
  'v': 'न', 'V': 'ऩ',
  'b': 'व', 'B': 'ऴ',
  'n': 'ल', 'N': 'ळ',
  'm': 'स', 'M': 'श',
  ',': ',', '<': 'ष',
  '.': '.', '>': '।',
  '/': 'य', '?': 'य़',
  ' ': ' '
};

/**
 * Resolves an incoming input character against the expected character token.
 * If language is Indic (Marathi or Hindi) and the key pressed matches the Inscript
 * equivalent of expected, it returns the expected Devanagari character.
 */
export function resolveIndicChar(inputChar: string, expectedChar: any, language: string): string {
  if (language !== 'marathi' && language !== 'hindi') {
    return inputChar;
  }
  const exp = typeof expectedChar === 'object' && expectedChar !== null ? expectedChar.char : expectedChar;
  if (!exp) return inputChar;
  if (inputChar === exp) return inputChar;
  const mapped = INSCRIPT_MAP[inputChar];
  if (mapped && mapped === exp) {
    return mapped;
  }
  return inputChar;
}
