const SIGN: string = '$';
export class DictionaryReplacer {
  replace(text: string, dictionary: any) {
    let start: boolean = false;
    let startIdx: number = 0;
    let result = '';
    for (let i = 0; i < text.length; i++) {
      if (text[i] === SIGN && start) {
        start = false;
        let pattern: string = text.substring(startIdx + 1, i);
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
    if (!(pattern in dictionary)) {
      return '';
    }
    return dictionary[pattern];
  }
}
