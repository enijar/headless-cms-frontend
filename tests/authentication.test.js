import "regenerator-runtime/runtime";
import fetchMock from "fetch-mock";
import services from "../src/app/services";

const VALID_RESPONSE = {user: {}};
const INVALID_RESPONSE = null;

test('Authentication fails when JWT is not set', async () => {
  const authenticated = await services.authenticate('/', null);
  expect(authenticated).toEqual(false);
});

test('Authentication passes when JWT is valid', async () => {
  fetchMock.mock('/api/auth/user', 200, {response: VALID_RESPONSE});
  const authenticated = await services.authenticate('/', 'valid-jwt');
  fetchMock.restore();
  expect(authenticated).toEqual(VALID_RESPONSE);
});

test('API status is 401 when JWT is invalid', async () => {
  fetchMock.mock('/api/auth/user', 401, {response: INVALID_RESPONSE});
  const authenticated = await services.authenticate('/', 'invalid-jwt');
  fetchMock.restore();
  expect(authenticated).toEqual(INVALID_RESPONSE);
});

fetchMock.reset();
