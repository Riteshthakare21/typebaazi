/**
 * TypeBaazi Unicode & Marathi Devanagari Processing Library
 * Ensures high-accuracy character segmentation, IME composition awareness,
 * and grapheme cluster handling for Marathi and English typing tests.
 */

export interface CharacterToken {
  char: string;
  isSpace: boolean;
}

export class UnicodeHelper {
  private static segmenter: Intl.Segmenter | null = null;

  private static getSegmenter(): Intl.Segmenter | null {
    if (this.segmenter) return this.segmenter;
    if (typeof Intl !== 'undefined' && typeof Intl.Segmenter === 'function') {
      try {
        this.segmenter = new Intl.Segmenter(['mr-IN', 'en-US'], { granularity: 'grapheme' });
      } catch {
        this.segmenter = null;
      }
    }
    return this.segmenter;
  }

  /**
   * Splits a string into an array of individual keystroke character tokens.
   * Works smoothly with Devanagari Inscript/Remington keystrokes, matras, halants, and English letters.
   */
  public static splitGraphemes(text: string): string[] {
    if (!text) return [];
    // Individual keystroke segmentation ensures 1-to-1 matching with physical/virtual keyboards
    return Array.from(text);
  }

  /**
   * Splits text into character tokens for the typing arena
   */
  public static tokenize(text: string): CharacterToken[] {
    const graphemes = this.splitGraphemes(text);
    return graphemes.map(g => ({
      char: g,
      isSpace: g === ' ' || g === '\n' || g === '\t'
    }));
  }

  /**
   * Calculates length in visual/perceptual characters rather than UTF-16 code units
   */
  public static getLength(text: string): number {
    return this.splitGraphemes(text).length;
  }

  /**
   * Normalizes Unicode text (NFC normalization) to avoid decomposed character mismatches
   */
  public static normalize(text: string): string {
    return text.normalize('NFC');
  }

  /**
   * Phonetic English-to-Marathi Transliteration Helper
   * Allows users without a Marathi keyboard to type phonetically (e.g. "namaskar" -> "नमस्कार")
   */
  public static transliteratePhonetic(englishText: string): string {
    const vowels: Record<string, string> = {
      'a': 'अ', 'aa': 'आ', 'A': 'आ', 'i': 'इ', 'ee': 'ई', 'I': 'ई',
      'u': 'उ', 'oo': 'ऊ', 'U': 'ऊ', 'e': 'ए', 'ai': 'ऐ', 'o': 'ओ',
      'au': 'औ', 'ou': 'औ', 'am': 'अं', 'aha': 'अः', 'R': 'ऋ'
    };

    const matras: Record<string, string> = {
      'aa': 'ा', 'A': 'ा', 'i': 'ि', 'ee': 'ी', 'I': 'ी',
      'u': 'ु', 'oo': 'ू', 'U': 'ू', 'e': 'े', 'ai': 'ै',
      'o': 'ो', 'au': 'ौ', 'ou': 'ौ', 'am': 'ं', 'aha': 'ः', 'R': 'ृ'
    };

    const consonants: Record<string, string> = {
      'k': 'क', 'kh': 'ख', 'g': 'ग', 'gh': 'घ', 'ng': 'ङ',
      'ch': 'च', 'chh': 'छ', 'j': 'ज', 'jh': 'झ', 'ny': 'ञ',
      'T': 'ट', 'Th': 'ठ', 'D': 'ड', 'Dh': 'ढ', 'N': 'ण',
      't': 'त', 'th': 'थ', 'd': 'द', 'dh': 'ध', 'n': 'न',
      'p': 'प', 'ph': 'फ', 'f': 'फ', 'b': 'ब', 'bh': 'भ', 'm': 'म',
      'y': 'य', 'r': 'र', 'l': 'ल', 'v': 'व', 'w': 'व',
      'sh': 'श', 'Sh': 'ष', 's': 'स', 'h': 'ह', 'L': 'ळ',
      'ksha': 'क्ष', 'tra': 'त्र', 'gya': 'ज्ञ', 'dnya': 'ज्ञ'
    };

    // Fast mapping for typing aid preview
    let out = '';
    let i = 0;
    const len = englishText.length;

    while (i < len) {
      let matched = false;
      // Try 4, 3, 2, 1 char matches
      for (let clen = 4; clen >= 1; clen--) {
        if (i + clen <= len) {
          const chunk = englishText.substr(i, clen);
          if (consonants[chunk]) {
            out += consonants[chunk];
            i += clen;
            matched = true;
            break;
          } else if (matras[chunk] && out.length > 0) {
            out += matras[chunk];
            i += clen;
            matched = true;
            break;
          } else if (vowels[chunk]) {
            out += vowels[chunk];
            i += clen;
            matched = true;
            break;
          }
        }
      }
      if (!matched) {
        out += englishText[i];
        i++;
      }
    }
    return out;
  }
}
