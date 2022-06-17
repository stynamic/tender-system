import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { stageRequest } from '../../actions';
import web3 from '../../utils/web3';

class StagesForm extends Component {
    state = {
        errorMessage: '',
        successMessage: ''
    }

    renderInput = ({ input, label, type, placeholder }) => {
        return (
            <Form.Input {...input} label={label} type={type} placeholder={placeholder} required />
        );
    }

    onSubmit = async ({ name, amount }) => {
        this.setState({ errorMessage: '', successMessage: '' });
        const { details, address, defaultAccount } = this.props;
        const { projectDeveloper,  amountClaimable } = details;

        try {
            
            if (defaultAccount !== projectDeveloper.toLowerCase()) throw new Error('You\'re not a project developer.');
            if (amount > web3.utils.fromWei(amountClaimable, 'ether')) throw new Error('Invalid amount.');

            await this.props.stageRequest(address);

            this.setState({ successMessage: 'Stage request submitted.' });

        } catch (error) {
            this.setState({ errorMessage: error.message });
        }
    }

    render() {
        const { errorMessage, successMessage } = this.state;
        const { handleSubmit, submitting, details } = this.props;

        return (
            <>
            { (details.stagesRemaining > 0)
            ?   <Form
                    onSubmit={handleSubmit(this.onSubmit)}
                    error={!!errorMessage}
                    success={!!successMessage}
                >
                    <Field
                        name="name"
                        component={this.renderInput}
                        label="Stage name"
                        placeholder="Enter stage name..."
                    />
                    <Field
                        name="amount"
                        component={this.renderInput}
                        label="Amount"
                        type="number"
                        placeholder="ETH"
                    />
                    <Message error>{errorMessage}</Message>
                    <Message success>{successMessage}</Message>
                    <Button basic color="black" type="submit" disabled={submitting}>Submit</Button>
                </Form>
            : 'All stages submitted.'}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return { details: state.tenderPassed, defaultAccount: state.accounts.defaultAccount }
}

export default reduxForm({
    form: 'stageForm'
})(connect(mapStateToProps, { stageRequest })(StagesForm));