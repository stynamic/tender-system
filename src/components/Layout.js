import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import NavigationBar from './NavigationBar';

class Layout extends Component {
    render() {
        return (
            <>
                <NavigationBar />
                <Container style={{ marginTop: '80px' }}>
                    {this.props.children}
                </Container>
            </>
        );
    }
}

export default Layout;