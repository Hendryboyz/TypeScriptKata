const SIGN: string = '$';
export class DictionaryReplacer {
  replace(text: string, dictionary: any) {
    let start: boolean = false;
    let startIdx: number = 0;
    let result = '';
    for (let i = 0; i < text.length; i++) {
      if (text[i] === SIGN && start) {
        start = false;
        let pattern: string = text.substring(startIdx, i + 1);
        result += this.replacePattern(pattern, dictionary);
      } else if (text[i] === SIGN && !start) {
        startIdx = i;
        start = true;
      } else if (!start) {
        result += text[i];
      }
    }
    return result;
  }

  private replacePattern(pattern: string, dictionary: any) {
    const word: string = pattern.slice(1, -1);
    if (!(word in dictionary)) {
      return pattern;
    }
    return dictionary[word];
  }
}
