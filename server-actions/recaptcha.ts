"use server";

interface ReCaptcha {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  "error-codes": Array<string>;
}

export async function getCaptchaValidity(key: string): Promise<boolean> {
  const captchaSecret = process.env.CAPTCHA_SECRET;
  const captchaUrl = process.env.CAPTCHA_URL;

  if (!captchaSecret) {
    throw new Error('CAPTCHA_SECRET is not defined');
  }

  if (!captchaUrl) {
    throw new Error('CAPTCHA_URL is not defined');
  }

  const response = await fetch(
    `${captchaUrl}?secret=${captchaSecret}&response=${key}`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  try {
    const responseData: ReCaptcha = await response.json();
    return responseData.success;
  } catch (error) {
    throw new Error(`Failed to parse JSON: ${error}`);
  }
}
