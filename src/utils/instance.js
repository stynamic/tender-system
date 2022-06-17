import contract from '@truffle/contract';
import provider from './provider';
import tenderFactoryArtifact from '../builds/TenderFactory.json';
import tenderArtifact from '../builds/Tender.json';
import tenderPassedArtifact from '../builds/TenderPassed.json';

const contractArtifact = {
    'TenderFactory': tenderFactoryArtifact,
    'Tender': tenderArtifact,
    'TenderPassed': tenderPassedArtifact
}

const instance = async (contractName, at = null) => {
    const abstraction = await contract(contractArtifact[contractName]);
    abstraction.setProvider(provider);
    if (at) {
        return await abstraction.at(at);
    }
    return await abstraction.deployed();
}

export default instance;