/**
 * Check if the current session is authenticated.
 * @return {Promise<Boolean>}
 */
import { LOCAL_STORAGE_KEY_PREFIX } from "../core/consts";

export default async () => {
  const jwt = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}.jwt`);
  if (jwt === null) {
    return false;
  }
  // @todo send request to API, to check if JWT is valid
  return false;
};
