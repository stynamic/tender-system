import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { placeBid } from '../../actions';


class PlaceBid extends Component {
    state = {
        errorMessage: '',
        successMessage: ''
    }

    renderInput = ({ input, label, type, placeholder }) => {
        return (
            <Form.Input {...input} label={label} type={type} placeholder={placeholder} required />
        );
    }

    onSubmit = async ({ amount, stages }) => {
        this.setState({ errorMessage: '', successMessage: '' });
        const { placeBid, address } = this.props;

        try {
            await placeBid(address);

            this.setState({ successMessage: 'Bid placed.' });
        } catch (error) {
            this.setState({ errorMessage: error.message });
        }
    }

    formStatus = () => {
        const { tender, tenderPassedBool } = this.props;

        const currentTime = (new Date()).getTime() / 1000;
        const isBiddingEnded = (tender.biddingEndTime - currentTime) < 0;

        if (!tender.biddingEndTime) {
            return <p>No data.</p>
        } else if (isBiddingEnded || tenderPassedBool) {
            return <p>Bidding closed.</p>;
        }
    }

    render() {
        const { errorMessage, successMessage } = this.state;
        const { handleSubmit, submitting } = this.props;

        return (
            <>
                {this.formStatus()
                    ? this.formStatus()
                    : < Form
                        onSubmit={handleSubmit(this.onSubmit)}
                        error={!!errorMessage}
                        success={!!successMessage}
                    >
                        <Form.Group width={2}>
                            <Field
                                name="amount"
                                component={this.renderInput}
                                label="Bid amount"
                                type="number"
                                placeholder="ETH"
                            />
                            <Field
                                name="stages"
                                component={this.renderInput}
                                label="Total stages"
                                type="number"
                                placeholder="Total stages"
                            />
                        </Form.Group>
                        <Message error>{errorMessage}</Message>
                        <Message success>{successMessage}</Message>
                        <Button basic color="black" type="submit" disabled={submitting}>Submit</Button>
                    </Form>
                }
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return { tender: state.tender, defaultAccount: state.accounts.defaultAccount }
}

export default reduxForm({
    form: 'placeBid'
})(connect(
    mapStateToProps,
    { placeBid }
)((PlaceBid)));