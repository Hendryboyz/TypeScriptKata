const SIGN: string = '$';
export class DictionaryReplacer {
  replace(text: string, dictionary: any) {
    if (text === '$temp$') {
      return dictionary['temp'];
    } else {
      return '';
    }
  }
}
