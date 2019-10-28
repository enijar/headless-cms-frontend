import "regenerator-runtime/runtime";
import fetchMock from "fetch-mock";
import services from "../src/app/services";
import { LOCAL_STORAGE_KEY_PREFIX } from "../src/app/core/consts";

const VALID_RESPONSE = {user: {}};
const INVALID_RESPONSE = null;

test('Authentication fails when JWT is not set', async () => {
  localStorage.removeItem(`${LOCAL_STORAGE_KEY_PREFIX}.jwt`);
  const authenticated = await services.authenticate();
  expect(authenticated).toEqual(null);
});

test('Authentication passes when JWT is valid', async () => {
  fetchMock.mock('/api/auth/user', 200, {response: VALID_RESPONSE});
  localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}.jwt`, JSON.stringify({jwt: 'valid', expired: Date.now() + 3600 * 1000}));
  const authenticated = await services.authenticate();
  fetchMock.restore();
  expect(authenticated).toEqual(VALID_RESPONSE);
});

test('API status is 401 when JWT is invalid', async () => {
  fetchMock.mock('/api/auth/user', 401, {response: INVALID_RESPONSE});
  localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}.jwt`, JSON.stringify({jwt: 'invalid', expired: Date.now() + 3600 * 1000}));
  const authenticated = await services.authenticate();
  fetchMock.restore();
  expect(authenticated).toEqual(INVALID_RESPONSE);
});

fetchMock.reset();
