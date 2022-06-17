const TenderFactory = artifacts.require('TenderFactory');

module.exports = (deployer) => {
    deployer.deploy(TenderFactory);
}