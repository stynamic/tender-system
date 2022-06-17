import React, { Component } from 'react';
import { Form, Message, Button, Segment, Header, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchTenderFactoryManager } from '../../actions';
import instance from '../../utils/instance';

class NewTender extends Component {
    state = {
        errorMessage: '',
        successMessage: ''
    }

    componentDidMount() {
        this.props.fetchTenderFactoryManager();
    }

    onSubmit = async ({ biddingWindow, name }) => {
        const { factoryManager, defaultAccount } = this.props;

        this.setState({ errorMessage: '', successMessage: ''});

        try {
            if (defaultAccount !== factoryManager.toLowerCase()) {
                throw new Error('You\'re not a manager.');
            }

            const tenderFactory = await instance('TenderFactory');
            await tenderFactory.newTender((biddingWindow * 24 * 60 * 60), name, { from: defaultAccount });

            this.setState({ successMessage: 'New tender added.' });
        } catch (error) {
            this.setState({ errorMessage: error.message });
        }
    }

    renderInput = ({ input, label, type }) => {
        return (
            <Form.Input {...input} label={label} type={type} required />
        );
    }

    render() {
        const { errorMessage, successMessage } = this.state;

        return (
            <>
                <Header as="h2">Create Tender</Header>
                <Segment padded="very" style={{ width: '50%', margin: 'auto' }}>
                    <Header as="h4">New tender</Header>
                    <Divider />
                    <Form
                        onSubmit={this.props.handleSubmit(this.onSubmit)}
                        error={!!errorMessage}
                        success={!!successMessage}
                    >
                        <Field name="biddingWindow" component={this.renderInput} label="Bidding window" type="number" />
                        <Field name="name" component={this.renderInput} label="Tender name" />
                        <Message error>{errorMessage}</Message>
                        <Message success>{successMessage}</Message>
                        <Button basic color="black" type="submit" disabled={this.props.submitting}>Submit</Button>
                    </Form>
                </Segment>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return { factoryManager: state.tendersList.factoryManager, defaultAccount: state.accounts.defaultAccount }
}

export default reduxForm({
    form: 'newTender'
})(connect(
    mapStateToProps,
    { fetchTenderFactoryManager }
)(NewTender));