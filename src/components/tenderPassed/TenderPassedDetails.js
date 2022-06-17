import React, { Component } from 'react';
import { Grid, Segment, Header, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchTenderPassedDetails } from '../../actions';
import web3 from '../../utils/web3';

class TenderPassedDetails extends Component {
    componentDidMount() {
        const { address, fetchTenderPassedDetails } = this.props;
        if (web3.utils.isAddress(address)) {
            fetchTenderPassedDetails(address);
        }
    }

    renderParticipants = () => {
        const { completed, manager, projectDeveloper } = this.props.details;

        if (!manager) {
            return <p>No data.</p>;
        }

        return (
            <>
                <p><b>Manager: </b>{manager}</p>
                <p><b>Project developer: </b>{projectDeveloper}</p>
                <p><b>Status: </b>{completed ? 'Completed' : 'Incomplete'}</p>
            </>
        );
    }

    renderCostings = () => {
        const { amountClaimable, amountReleased, projectCost } = this.props.details;

        if (!projectCost) {
            return <p>No data.</p>;
        }

        const { fromWei } = web3.utils;
        return (
            <>
                <p><b>Total cost: </b>{`${fromWei(projectCost, 'ether')} ETH`}</p>
                <p><b>Amount Claimable: </b>{`${fromWei(amountClaimable, 'ether')} ETH`}</p>
                <p><b>Amount Released: </b>{`${fromWei(amountReleased, 'ether')} ETH`}</p>
            </>
        );
    }

    render() {
        const { Row, Column } = Grid;

        return (
            <>
                <Grid>
                    <Row>
                        <Column width={10}>
                            <Segment>
                                <Header as="h4">Participants</Header>
                                <Divider />
                                {this.renderParticipants()}
                            </Segment>
                        </Column>
                        <Column width={6}>
                            <Segment>
                                <Header as="h4">Costings</Header>
                                <Divider />
                                {this.renderCostings()}
                            </Segment>
                        </Column>
                    </Row>
                </Grid>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return { details: state.tenderPassed }
}

export default connect(
    mapStateToProps,
    { fetchTenderPassedDetails }
)(TenderPassedDetails);