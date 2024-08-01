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
  const response = await fetch(
    `${captchaUrl}?secret=${captchaSecret}&response=${key}`,
    {
      method: "POST",
    }
  );
  const responseData: ReCaptcha = await response.json();
  return responseData?.success;
}
