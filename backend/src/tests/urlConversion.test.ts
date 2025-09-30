import { generateShortCode } from '../services/urlConversionService';

test('generateShortCode should return string of given length', () => {
  const code = generateShortCode(6);
  expect(code).toHaveLength(6);
});