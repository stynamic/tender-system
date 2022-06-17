import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Container, Button, Icon } from 'semantic-ui-react';
import web3 from '../utils/web3';
import { setDefaultAccount } from '../actions';

class NavigationBar extends Component {
    async componentDidMount() {
        const accounts = await web3.eth.getAccounts();

        if (accounts[0]) {
            this.props.setDefaultAccount(accounts[0].toLowerCase());
            this.onAccountChange();            
        }
    }

    onAccountChange = () => {
        window.ethereum.on('accountsChanged', (changedAccounts) => {
            this.props.setDefaultAccount(changedAccounts[0]);
        });
    }

    onConnectClick = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        this.props.setDefaultAccount(accounts[0]);
        this.onAccountChange();
    }

    renderConnectButton = () => {
        const { defaultAccount } = this.props.accounts;
        const isMetaMask = typeof window.ethereum !== 'undefined';

        if (!isMetaMask) {
            return 'Install MetaMask'
        } else if (defaultAccount) {
            return defaultAccount;
        } else {
            return <Button onClick={this.onConnectClick}>Connect</Button>;
        }

    }

    render() {
        return (
            <Menu fixed="top" inverted>
                <Container>
                    <Menu.Item header>
                        <Icon name="industry" size="big" />
                        Tender System
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/">
                            Home
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/new">
                            New Tender
                        </Link>
                    </Menu.Item>
                    <Menu.Menu position="right">
                        <Menu.Item>
                            {this.renderConnectButton()}
                        </Menu.Item>
                    </Menu.Menu>
                </Container>
            </Menu>
        );
    }
}

const mapStateToProps = (state) => {
    return { accounts: state.accounts }
}

export default connect(
    mapStateToProps,
    { setDefaultAccount }
)(NavigationBar);