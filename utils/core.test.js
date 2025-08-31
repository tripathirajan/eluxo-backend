const {
  uuid,
  otp,
  slugify,
  getRootDirPath,
  parseDurationToMs,
} = require('./core');

describe('Core Utility', () => {
  test('uuid should generate a valid UUID v4 string', () => {
    const id = uuid();
    expect(typeof id).toBe('string');
    expect(id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    );
  });

  test('otp should generate a numeric string of default length 6', () => {
    const code = otp();
    expect(code).toHaveLength(6);
    expect(/^\d{6}$/.test(code)).toBe(true);
  });

  test('otp should generate a numeric string of custom length', () => {
    const code = otp(4);
    expect(code).toHaveLength(4);
    expect(/^\d{4}$/.test(code)).toBe(true);
  });

  test('slugify should convert text to lowercase kebab-case', () => {
    const text = 'Hello World Example';
    const slug = slugify(text);
    expect(slug).toBe('hello-world-example');
  });

  test('getRootDirPath should return a string path', () => {
    const root = getRootDirPath();
    expect(typeof root).toBe('string');
    expect(root.length).toBeGreaterThan(0);
  });

  test('parseDurationToMs should parse valid duration strings', () => {
    expect(parseDurationToMs('1s')).toBe(1000);
    expect(parseDurationToMs('1m')).toBe(60000);
    expect(parseDurationToMs('2h')).toBe(7200000);
    expect(parseDurationToMs('1d')).toBe(86400000);
  });

  test('parseDurationToMs should return 7d in milliseconds', () => {
    expect(parseDurationToMs('invalid')).toBe(604800000);
  });
  test('parseDurationToMs should return 7d in milliseconds if no parameter is provided', () => {
    expect(parseDurationToMs()).toBe(604800000);
  });
});
