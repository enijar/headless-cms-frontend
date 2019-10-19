import "regenerator-runtime/runtime";
import { expect } from "chai";
import { describe, it } from "mocha";
import fetchMock from "fetch-mock";
import services from "../src/app/services";

const VALID_USER_RESPONSE = {user: {}};

describe('authentication', () => {
  it('return false when JWT is not set', async () => {
    const authenticated = await services.authenticate('/', null);
    expect(authenticated).to.equal(false);
  });

  it('return true when JWT is valid', async () => {
    fetchMock.mock('/api/user', 200, {response: VALID_USER_RESPONSE});
    const authenticated = await services.authenticate('/', 'valid-jwt');
    fetchMock.restore();
    expect(authenticated).to.include.keys('user');
  });

  fetchMock.reset();
});
