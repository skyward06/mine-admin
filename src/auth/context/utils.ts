import { CONFIG } from '../../config';

// ----------------------------------------------------------------------

function jwtDecode(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
}

// ----------------------------------------------------------------------

export const isValidToken = (token: string) => {
  if (!token) {
    return false;
  }

  const decoded = jwtDecode(token);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

// ----------------------------------------------------------------------

export function getTimeToLive(accessToken: string | null | undefined) {
  if (!accessToken) {
    return 0;
  }

  try {
    const decoded = jwtDecode(accessToken);

    if (!decoded || !('exp' in decoded)) {
      return 0;
    }

    const timeToLive = decoded.exp * 1000 - Date.now();
    // if it exceeds setTimeout's maximum limit, don't createTimer
    if (timeToLive >= 2147483646) {
      return 2147483646;
    }

    return timeToLive;
  } catch (error) {
    console.error('Error during token validation:', error);
    return 0;
  }
}

// ----------------------------------------------------------------------

export async function setSession(accessToken: string | null) {
  if (accessToken) {
    localStorage.setItem(CONFIG.storageTokenKey, accessToken);
  } else {
    localStorage.removeItem(CONFIG.storageTokenKey);
  }
}

// ----------------------------------------------------------------------

export function getSession() {
  const accessToken = localStorage.getItem(CONFIG.storageTokenKey);
  return accessToken;
}
