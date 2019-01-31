var TrophyToken = artifacts.require("./TrophyToken.sol");

module.exports = function(deployer, network) {
  let uriBase;

  if (network != 'live') {
    uriBase = 'http://localhost:3000/trophy/';
  }

  deployer.deploy(TrophyToken, uriBase);
};
