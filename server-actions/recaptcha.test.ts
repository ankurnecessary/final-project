import { getCaptchaValidity } from './recaptcha';

describe('getCaptchaValidity', () => {
  const mockSecret = 'mock-secret';
  const mockUrl = 'https://www.google.com/recaptcha/api/siteverify';
  const validResponse = { success: true };
  const invalidResponse = { success: false };

  // Mocking fetch
  global.fetch = jest.fn();

  beforeEach(() => {
    process.env.CAPTCHA_SECRET = mockSecret;
    process.env.CAPTCHA_URL = mockUrl;
    (fetch as jest.Mock).mockClear();
  });

  it('should return true for a valid captcha response', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(validResponse),
    });

    const result = await getCaptchaValidity('valid-key');
    expect(result).toBe(true);
    expect(fetch).toHaveBeenCalledWith(
      `${mockUrl}?secret=${mockSecret}&response=valid-key`,
      { method: 'POST' }
    );
  });

  it('should return false for an invalid captcha response', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(invalidResponse),
    });

    const result = await getCaptchaValidity('invalid-key');
    expect(result).toBe(false);
    expect(fetch).toHaveBeenCalledWith(
      `${mockUrl}?secret=${mockSecret}&response=invalid-key`,
      { method: 'POST' }
    );
  });

  it('should throw an error if CAPTCHA_SECRET is not defined', async () => {
    delete process.env.CAPTCHA_SECRET;

    await expect(getCaptchaValidity('any-key')).rejects.toThrow(
      'CAPTCHA_SECRET is not defined'
    );
  });

  it('should throw an error if CAPTCHA_URL is not defined', async () => {
    delete process.env.CAPTCHA_URL;

    await expect(getCaptchaValidity('any-key')).rejects.toThrow(
      'CAPTCHA_URL is not defined'
    );
  });

  it('should throw an error if the network response is not ok', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      statusText: 'Bad Request',
    });

    await expect(getCaptchaValidity('any-key')).rejects.toThrow(
      'Network response was not ok: Bad Request'
    );
  });

  it('should throw an error if the response JSON parsing fails', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockRejectedValue(new Error('Invalid JSON')),
    });

    await expect(getCaptchaValidity('any-key')).rejects.toThrow(
      'Failed to parse JSON: Error: Invalid JSON'
    );
  });
});
