import { DictionaryReplacer } from './dict-replacer';

describe('Dictionary Replacer', () => {
  let dictionaryReplacer: any = undefined;
  beforeEach(() => {
    dictionaryReplacer = new DictionaryReplacer();
  });

  it('Given empty string and dictionary, then return empty string', () => {
    const result: string = dictionaryReplacer.replace('', {});
    expect(result).toMatch('');
  });
});
