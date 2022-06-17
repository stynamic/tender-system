import React, { Component } from 'react';
import { Grid, Segment, Header, Divider } from 'semantic-ui-react';
import StageForm from './StageForm';
import StagesList from './StagesList';

class Stages extends Component {
    render() {
        const { Row, Column } = Grid;
        const { address } = this.props;

        return (
            <>
                <Grid>
                    <Row >
                        <Column width={6}>
                            <Segment>
                                <Header as="h4">Submit stage</Header>
                                <Divider />
                                <StageForm address={address} />
                            </Segment>
                        </Column>
                        <Column width={10}>
                            <Segment>
                                <Header as="h4">Submitted stages</Header>
                                <Divider />
                                <StagesList address={address} />
                            </Segment>
                        </Column>
                    </Row>
                </Grid>
            </>
        );
    }
}

export default Stages;