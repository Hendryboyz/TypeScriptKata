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

  const normalCases: any[] = [
    {
      text: '$temp$ here comes the name $name$',
      dictionary: {
        temp: 'temporary',
        name: 'John Doe'
      },
      expectedResult: 'temporary here comes the name John Doe'
    },
    {
      text: '$temp$ here comes the name $name$',
      dictionary: {
        temp: 'temporary'
      },
      expectedResult: 'temporary here comes the name $name$'
    }
  ];

  test.each(normalCases)(
    'Given pattern and dictionary, then return result: $expectedResult',
    ({ text, dictionary, expectedResult }) => {
      const result: string = dictionaryReplacer.replace(text, dictionary);
      expect(result).toMatch(expectedResult);
    }
  );
});
