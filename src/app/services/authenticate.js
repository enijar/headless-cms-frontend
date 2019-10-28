import api from "./api";
import { LOCAL_STORAGE_KEY_PREFIX } from "../core/consts";

/**
 * Check if the current session is authenticated.
 * @return {Promise<Boolean|Object>}
 */
export default async () => {
  const jwt = JSON.parse(localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}.jwt`));

  if (process.env.APP_ENV === 'development' && process.env.APP_USER) {
    return {
      status: 200,
      errors: [],
      data: JSON.parse(process.env.APP_USER),
    };
  }

  if (jwt === null) {
    return false;
  }

  // todo: check if JWT is expired before making API request

  const res = await api.get('/api/auth/user');

  if (res.status === 401) {
    return false;
  }

  return res.data;
};
