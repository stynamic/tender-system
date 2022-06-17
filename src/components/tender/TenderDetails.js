import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Segment, Divider, Header, Grid } from 'semantic-ui-react';
import { fetchTenderDetails } from '../../actions';
import RenderTable from './RenderTable';
import PlaceBid from './PlaceBid';
import RenderDetails from './RenderDetails';
import web3 from '../../utils/web3';

const TenderDetails = (props) => {
    const { address } = useParams();
    
    useEffect(() => {
        if (web3.utils.isAddress(address)) {
            fetchTenderDetails(address);
        }
    }, []);

    const { Row, Column } = Grid;
    const { fetchTenderDetails, tender } = props;
    const tenderPassedBool = tender.tenderPassed !== '0x0000000000000000000000000000000000000000';

    return (
        <>
            <Header as="h2">Tender</Header>
            <Grid columns="2">
                <Row>
                    <Column>
                        <Segment>
                            <Header as="h4">Tender Details</Header>
                            <Divider />
                            <RenderDetails tenderPassedBool={tenderPassedBool} />
                        </Segment>
                    </Column>
                    <Column>
                        <Segment piled>
                            <Header as="h4">Place Bid</Header>
                            <Divider />
                            <PlaceBid address={address} tenderPassedBool={tenderPassedBool} />
                        </Segment>
                    </Column>
                </Row>
            </Grid>
            <Divider horizontal>
                <Header as="h4">Proposals</Header>
            </Divider>
            <RenderTable address={address} manager={props.tender.manager} tenderPassedBool={tenderPassedBool} />
        </>
    );
}

const mapStateToProps = (state) => {
    return { tender: state.tender }
}

export default connect(
    mapStateToProps,
    { fetchTenderDetails }
)(TenderDetails);