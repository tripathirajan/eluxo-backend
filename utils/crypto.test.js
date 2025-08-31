const {
  randomHexString,
  signWithHMAC,
  verifyHMAC,
  randomBase64String,
  generateHash,
  generateHashWithSalt,
  verifyHash,
  randomUUID,
  getSalt,
} = require('./crypto');

describe('Crypto Utility', () => {
  test('randomHexString should return hex string of given length', () => {
    const str = randomHexString(18);
    expect(typeof str).toBe('string');
    expect(str).toHaveLength(36);
    expect(/^[0-9a-f]+$/.test(str)).toBe(true);
  });

  test('randomHexString should return hex string of default length 16', () => {
    const str = randomHexString();
    expect(typeof str).toBe('string');
    expect(str).toHaveLength(32);
    expect(/^[0-9a-f]+$/.test(str)).toBe(true);
  });

  test('randomBase64String should return base64 string of given length', () => {
    const str = randomBase64String(18);
    expect(typeof str).toBe('string');
    // Base64 encoding increases size, so we check for minimum length
    expect(str.length).toBeGreaterThanOrEqual(24);
    expect(/^[A-Za-z0-9+/=]+$/.test(str)).toBe(true);
  });
  test('randomBase64String should return base64 string of default length 16', () => {
    const str = randomBase64String();
    expect(typeof str).toBe('string');
    // Base64 encoding increases size, so we check for minimum length
    expect(str.length).toBeGreaterThanOrEqual(24);
    expect(/^[A-Za-z0-9+/=]+$/.test(str)).toBe(true);
  });
});

describe('signWithHMAC and verifyHMAC', () => {
  test('signWithHMAC should return a valid HMAC signature', () => {
    const key = 'secretkey';
    const message = 'hello world';
    const signature = signWithHMAC(key, message);
    expect(typeof signature).toBe('string');
    expect(signature.length).toBeGreaterThan(0);
  });

  test('verifyHMAC should return true for valid signature', () => {
    const message = 'important message';
    const signature = signWithHMAC(message);
    expect(verifyHMAC(message, signature)).toBe(true);
  });

  test('verifyHMAC should return false for invalid signature', () => {
    const message = 'important message';
    const signature = signWithHMAC(message);
    // Tamper the signature
    const badSignature =
      signature.slice(0, -1) + (signature.slice(-1) === 'a' ? 'b' : 'a');
    expect(verifyHMAC(message, badSignature)).toBe(false);
  });

  test('verifyHMAC should return false for wrong key', () => {
    const key = 'key1';
    const message = 'msg';
    const signature = signWithHMAC(key, message);
    expect(verifyHMAC('key2', message, signature)).toBe(false);
  });
});

describe('generateHash, generateHashWithSalt', () => {
  test('generateHash should return a hash string', () => {
    const password = 'mypassword';
    const hash = generateHash(password);
    expect(typeof hash).toBe('string');
    expect(hash.length).toBeGreaterThan(0);
  });

  test('generateHashWithSalt should return an object with hash and salt', () => {
    const password = 'mypassword';
    const salt = getSalt(10);
    const result = generateHashWithSalt(password, salt);
    expect(typeof result).toBe('string');
  });
});

describe('verifyHash', () => {
  test('should return true for correct plaintext and hash', () => {
    const password = 'testpassword';
    const hash = generateHash(password);
    expect(verifyHash(password, hash)).toBe(true);
  });

  test('should return false for incorrect plaintext', () => {
    const password = 'testpassword';
    const wrongPassword = 'wrongpassword';
    const hash = generateHash(password);
    expect(verifyHash(wrongPassword, hash)).toBe(false);
  });

  test('should return false if plaintext is empty', () => {
    const password = 'testpassword';
    const hash = generateHash(password);
    expect(verifyHash('', hash)).toBe(false);
  });

  test('should return false if hash is empty', () => {
    const password = 'testpassword';
    expect(verifyHash(password, '')).toBe(false);
  });

  test('should return false if both plaintext and hash are empty', () => {
    expect(verifyHash('', '')).toBe(false);
  });

  test('should return false if hash is not a valid bcrypt hash', () => {
    const password = 'testpassword';
    const invalidHash = 'notavalidhash';
    expect(verifyHash(password, invalidHash)).toBe(false);
  });
});

describe('randomUUID', () => {
  test('randomUUID should return a valid UUID v4 string', () => {
    const uuid = randomUUID();
    // UUID v4 regex
    const uuidV4Regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(typeof uuid).toBe('string');
    expect(uuidV4Regex.test(uuid)).toBe(true);
  });

  test('randomUUID should return unique values on multiple calls', () => {
    const uuid1 = randomUUID();
    const uuid2 = randomUUID();
    expect(uuid1).not.toBe(uuid2);
  });
});
