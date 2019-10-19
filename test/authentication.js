import "regenerator-runtime/runtime";
import { expect } from "chai";
import { describe, it } from "mocha";
import fetchMock from "fetch-mock";
import services from "../src/app/services";

const VALID_RESPONSE = {user: {}};
const INVALID_RESPONSE = null;

describe('authentication', () => {
  it('return false when JWT is not set', async () => {
    const authenticated = await services.authenticate('/', null);
    expect(authenticated).to.equal(false);
  });

  it('return user object from API when JWT is valid', async () => {
    fetchMock.mock('/api/user', 200, {response: VALID_RESPONSE});
    const authenticated = await services.authenticate('/', 'valid-jwt');
    fetchMock.restore();
    expect(authenticated).to.eql(VALID_RESPONSE);
  });

  it('return false from API when JWT is valid', async () => {
    fetchMock.mock('/api/user', 401, {response: INVALID_RESPONSE});
    const authenticated = await services.authenticate('/', 'invalid-jwt');
    fetchMock.restore();
    expect(authenticated).to.equal(INVALID_RESPONSE);
  });

  fetchMock.reset();
});
