import React, { Component } from 'react';
import { NavLink, Route, withRouter } from 'react-router-dom';
import TrophyToken from './contracts/TrophyToken.json';
import getWeb3 from './utils/getWeb3';
import { Container, Image, Input, Menu } from 'semantic-ui-react';
import CreateTrophy from './CreateTrophy';
import ViewAccountTrophies from './ViewAccountTrophies';

import './App.css';
import 'semantic-ui-forest-themes/semantic.darkly.min.css';

import trophy from './trophies/trophy_1.svg';

class App extends Component {
  state = {
    web3: null,
    accounts: null,
    contract: null,
    search: ''
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TrophyToken.networks[networkId];
      const instance = new web3.eth.Contract(
        TrophyToken.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  onChangeSearch = async (e, { name, value }) => {
    const { history } = this.props;
    const { web3 } = this.state;

    this.setState({ [name]: value });

    if (web3.utils.isAddress(value)) {
      history.push(`/view/${value}`);
      this.setState({ [name]: '' });
    }
  };

  render() {
    const { web3, accounts, contract, search } = this.state;

    if (!web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
      <div className="App">
        <Menu fixed="top">
          <Menu.Item header>
            <Image src={trophy} className="menuHeaderImage" />
            &nbsp;
            TrophyToken
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item as={NavLink} exact to="/">Create New Trophy</Menu.Item>
            <Menu.Item as={NavLink} to={`/view/${accounts[0]}`}>
              View My Trophies
            </Menu.Item>
            <Menu.Item>
              <Input
                icon="search"
                placeholder="Search addresses"
                name="search"
                value={search}
                onChange={this.onChangeSearch}
              />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Container>
          <Route exact path="/" render={props => (
            <CreateTrophy
              {...props}
              accounts={accounts}
              contract={contract}
            />
          )} />
          <Route path="/view/:address" render={props => (
            <ViewAccountTrophies
              {...props}
              accounts={accounts}
              contract={contract}
              key={props.match.params.address}
            />
          )} />
        </Container>
      </div>
    );
  }
}

export default withRouter(App);
