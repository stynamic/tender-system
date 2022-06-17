import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

class RenderDetails extends Component {
    render() {
        const { tenderPassedBool, tender } = this.props;
        const { manager, tenderPassed, biddingEndTime, name } = tender;

        return (
            <>
                {!biddingEndTime
                    ? <p>No data</p>
                    : <>
                        <p><b>Tender name: </b>{name}</p>
                        <p><b>Manager: </b>{manager}</p>
                        <p><b>Bidding ends on: </b>{(new Date(biddingEndTime * 1000)).toLocaleString()}</p>
                        <p>
                            <b>Tender passed: </b>
                            {tenderPassedBool ? (
                                <Link to={`/tender/passed/${tenderPassed}`}>
                                    <Button basic color="black">Visit</Button>
                                </Link>
                            ) : 'No'}
                        </p>
                    </>
                }
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return { tender: state.tender }
}

export default connect(mapStateToProps)(RenderDetails);