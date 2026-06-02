import { toSafeHttpUrl } from '../utils/format';

const BITS_IMAGE_LOCAL_EXT_RE = /\.(?:avif|gif|jpe?g|png|svg|webp)$/i;
const DATA_URL_RE = /^data:/i;

export const normalizeBitsLocalImageSource = (value: string): string | null => {
  const normalized = value.trim().replace(/\\/g, '/').replace(/^\.\/+/, '');
  if (
    !normalized
    || normalized.startsWith('/')
    || normalized.startsWith('//')
    || normalized.startsWith('public/')
    || /^[A-Za-z]+:\/\//.test(normalized)
    || DATA_URL_RE.test(normalized)
    || normalized.includes(':')
    || /(^|\/)\.\.(?:\/|$)/.test(normalized)
    || normalized.includes('?')
    || normalized.includes('#')
  ) {
    return null;
  }

  return BITS_IMAGE_LOCAL_EXT_RE.test(normalized) ? normalized : null;
};

export const normalizeBitsImageSource = (value: string): string | null => {
  const safeRemoteUrl = toSafeHttpUrl(value);
  if (safeRemoteUrl && safeRemoteUrl.startsWith('https://')) return safeRemoteUrl;
  return normalizeBitsLocalImageSource(value);
};

export const isBitsImageSource = (value: string): boolean =>
  normalizeBitsImageSource(value) !== null;
