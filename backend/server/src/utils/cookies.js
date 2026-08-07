import config from '../config/index.js';

export const setAuthCookies = (res, { accessToken, refreshToken }) => {
  res.cookie(config.jwt.accessCookieName, accessToken, {
    httpOnly: true,
    secure: config.isProd,
    sameSite: 'lax',
    maxAge: 15 * 60 * 1000,
  });
  res.cookie(config.jwt.refreshCookieName, refreshToken, {
    httpOnly: true,
    secure: config.isProd,
    sameSite: 'lax',
    path: `${config.apiPrefix}/auth`,
    maxAge: config.jwt.refreshCookieMaxAgeMs,
  });
};

export const clearAuthCookies = (res) => {
  res.clearCookie(config.jwt.accessCookieName);
  res.clearCookie(config.jwt.refreshCookieName, { path: `${config.apiPrefix}/auth` });
};

export default { setAuthCookies, clearAuthCookies };
