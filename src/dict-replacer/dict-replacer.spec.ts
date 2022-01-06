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

  it('Given text "$temp$" and dict, then return substition result', () => {
    const result: string = dictionaryReplacer.replace('$temp$', {
      temp: 'temporary'
    });
    expect(result).toMatch('temporary');
  });
});
