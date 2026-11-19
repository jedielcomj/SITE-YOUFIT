export const TRIAL_CHECKOUT_URL =
  'https://checkout.metafit.cc/?plan=dd8706f4-b9a3-46c8-a40a-6601fe2988e7&trial=nocard';

export const LOGIN_URL = 'https://app.metafit.cc/login';
export const WHATSAPP_URL = 'https://wa.me/5512981761453';
export const INSTAGRAM_URL = 'https://www.instagram.com/metafit.cc';
export const TIKTOK_URL = 'https://www.tiktok.com/@metafit.cc';

export function appendUtmParams(baseUrl: string, search: string): string {
  if (!search || search.length <= 1) return baseUrl;
  try {
    const url = new URL(baseUrl);
    const params = new URLSearchParams(search);
    params.forEach((value, key) => {
      if (!url.searchParams.has(key)) {
        url.searchParams.set(key, value);
      }
    });
    return url.toString();
  } catch {
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}${search.slice(1)}`;
  }
}
