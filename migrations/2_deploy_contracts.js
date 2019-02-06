var TrophyToken = artifacts.require("./TrophyToken.sol");

module.exports = function(deployer, network) {
  const tokenPrice = '2500000000000000';

  let uriBase = '';
  if (network != 'live') {
    uriBase = 'http://localhost:3000/trophy/';
  }

  deployer.deploy(TrophyToken, tokenPrice, uriBase);
};
