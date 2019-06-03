const expect = require('chai').expect;
const fetch  = require('node-fetch');

describe('Fetch', function () {
  it('It should be an Array', async () => {
    var response = await fetch('https://api.github.com/users');
    expect(response.status).to.be.equal(200);
    var user = await response.json();
    expect(user).to.be.an('Array');
  });
});