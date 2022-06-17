import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Message } from 'semantic-ui-react';
import { fetchProposals } from '../../actions';
import web3 from '../../utils/web3';
import instance from '../../utils/instance';

class RenderTable extends Component {
    state = {
        errorMessage: '',
        successMessage: '',
        disabled: false
    }

    componentDidMount() {
        const { fetchProposals, address } = this.props;
        
        if (web3.utils.isAddress(address)) {
            fetchProposals(address);
        }
    }

    onClick = async (index) => {
        const { address, manager, proposals, defaultAccount } = this.props;

        this.setState({ errorMessage: '', successMessage: '', disabled: true });

        try {            
            if (defaultAccount !== manager.toLowerCase()) throw new Error('You\'re not a manger.');
            
            const tender = await instance('Tender', address);
            await tender.allocateTender(index, { from: defaultAccount });

            this.setState({ successMessage: `Tender allocated to ${proposals[index].bidderAddress}`, disabled: false });
        } catch (error) {
            this.setState({ errorMessage: error.message, disabled: false });
        }
    }

    renderRows = () => {
        const { Row, Cell } = Table;
        const { proposals = [] } = this.props;

        if (!proposals.length) {
            return (
                <Row>
                    <Cell
                        colSpan="4"
                        textAlign="center"
                    >
                        No proposals.
                    </Cell>
                </Row>
            );
        }

        return proposals.map((proposal, index) => {
            return (
                <Row key={index}>
                    <Cell>{proposal.bidderAddress}</Cell>
                    <Cell>{web3.utils.fromWei(proposal.amount, 'ether')}</Cell>
                    <Cell>{proposal.totalStages}</Cell>
                    <Cell>
                        <Button
                            basic
                            color="black"
                            disabled={this.state.disabled || this.props.tenderPassedBool}
                            onClick={() => this.onClick(index)}
                        >
                            Allocate
                        </Button>
                    </Cell>
                </Row>
            );
        });

    }

    render() {
        const { Header, Body, Row, HeaderCell } = Table;
        const { errorMessage, successMessage } = this.state;

        return (
            <>
                <Message error hidden={!errorMessage}>
                    {errorMessage}
                </Message>
                <Message success hidden={!successMessage}>
                    {successMessage}
                </Message>
                <Table celled striped>
                    <Header>
                        <Row>
                            <HeaderCell>Bidder</HeaderCell>
                            <HeaderCell>Bid amount (ETH)</HeaderCell>
                            <HeaderCell>Total stages</HeaderCell>
                            <HeaderCell>Action</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRows()}
                    </Body>
                </Table>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return { proposals: state.tender.proposals, defaultAccount: state.accounts.defaultAccount }
}

export default connect(
    mapStateToProps,
    { fetchProposals }
)(RenderTable);