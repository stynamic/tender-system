import React, { Component } from 'react';
import { Card, Button, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchTenderStages, grantStage } from '../../actions';
import web3 from '../../utils/web3';

class StagesList extends Component {
    state = {
        errorMessage: '',
        successMessage: '',
        disabled: false
    }

    componentDidMount() {
        const { address, fetchTenderStages } = this.props;

        if (web3.utils.isAddress(address)) {
            fetchTenderStages(address);
        }
    }

    onClick = async (index) => {
        this.setState({ errorMessage: '', successMessage: '', disabled: true });

        const { details, address, defaultAccount, grantStage } = this.props;
        const { stages, manager } = details;

        try {
            if (defaultAccount !== manager.toLowerCase()) throw new Error('You\'re not a manager.');
            if (stages[index].completed) throw new Error('Stage already granted.');

            await grantStage(address, index);

            this.setState({ successMessage: 'Stage amount granted.', disabled: false });
        } catch (error) {
            this.setState({ errorMessage: error.message, disabled: false });
        }
    }

    renderStages = () => {
        const { stages = [] } = this.props.details;

        if (!stages.length) {
            return <p>No data.</p>
        }

        return stages.map((stage, index) => {
            const { Content, Header, Meta, Description } = Card;
            const { stageName, amount, completed } = stage;

            return (
                <Card key={index} color="grey">
                    <Content>
                        <Header>{stageName}</Header>
                        <Meta>{`${web3.utils.fromWei(amount, 'ether')} ETH`}</Meta>
                        <Description>Completed: {completed ? 'Yes' : 'No'}</Description>
                    </Content>
                    <Content extra textAlign="right">
                        <Button
                            basic
                            color="black"
                            disabled={this.state.disabled || completed}
                            onClick={() => this.onClick(index)}
                        >
                            Pay
                        </Button>
                    </Content>
                </Card>
            );
        });
    }

    render() {
        const { errorMessage, successMessage } = this.state;

        return (
            <>
                <p><b>Stages remaining: </b>{this.props.details.stagesRemaining}</p>
                <Message error hidden={!errorMessage}>
                    {errorMessage}
                </Message>
                <Message success hidden={!successMessage}>
                    {successMessage}
                </Message>
                <Card.Group>
                    {this.renderStages()}
                </Card.Group>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return { details: state.tenderPassed, defaultAccount: state.accounts.defaultAccount }
}

export default connect(
    mapStateToProps,
    { fetchTenderStages, grantStage }
)(StagesList);