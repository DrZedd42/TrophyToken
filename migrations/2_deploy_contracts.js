var TrophyToken = artifacts.require("./TrophyToken.sol");

module.exports = function(deployer) {
  deployer.deploy(TrophyToken);
};
