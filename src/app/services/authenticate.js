import api from "./api";

/**
 * Check if the current session is authenticated.
 * @param {String} pathname
 * @param {String} jwt
 * @return {Promise<Boolean>}
 */
export default async (pathname, jwt) => {
  if (jwt === null) {
    return false;
  }

  const res = await api
    .headers({
      'Authorization': `Bearer ${jwt}`,
    })
    .get('/api/user', {jwt});

  if (res.status === 401) {
    return false;
  }

  return res.data;
};
