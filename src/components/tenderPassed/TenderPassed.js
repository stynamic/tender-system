import React from 'react';
import { Header } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import TenderPassedDetails from './TenderPassedDetails';
import Stages from './Stages';

const TenderPassed = () => {
    const { address } = useParams();

    return (
        <>
            <Header as="h2">Tender Passed</Header>
            <TenderPassedDetails address={address} />
            <Stages address={address} />  
        </>
    )
}

export default TenderPassed;