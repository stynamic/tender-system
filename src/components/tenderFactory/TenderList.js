import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTenders } from '../../actions';

class App extends Component {
    componentDidMount() {
        this.props.fetchTenders();
    }

    renderRows = () => {
        const { Row, Cell } = Table;
        const { tenders = [] } = this.props;

        if (!tenders.length) {
            return (
                <Row>
                    <Cell
                        colSpan="2"
                        textAlign="center"
                    >
                        No tenders.
                    </Cell>
                </Row>
            );
        }

        return tenders.map((tender, index) => {
            return (
                <Row key={index}>
                    <Cell>{tender}</Cell>
                    <Cell>
                        <Link to={`/tender/${tender}`}>
                            <Button basic color="black">View</Button>
                        </Link>
                    </Cell>
                </Row>
            );
        });

    }

    render() {
        const { Header, Body, Row, HeaderCell } = Table;
        return (
            <>
                <h2>Tenders List</h2>   
                <Table celled striped>
                    <Header>
                        <Row>
                            <HeaderCell>Address</HeaderCell>
                            <HeaderCell>Action</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRows()}
                    </Body>
                </Table>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return { tenders: state.tendersList.tenders }
}

export default connect(mapStateToProps, { fetchTenders })(App);