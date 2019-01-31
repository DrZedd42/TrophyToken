import React, { Component } from 'react';
import { NavLink, Route, withRouter } from 'react-router-dom';
import TrophyToken from './contracts/TrophyToken.json';
import getWeb3 from './utils/getWeb3';
import {
  Card,
  Container,
  Image,
  Input,
  Loader,
  Menu
} from 'semantic-ui-react';
import CreateTrophy from './CreateTrophy';
import ViewAccountTrophies from './ViewAccountTrophies';
import ViewTrophy from './ViewTrophy';

import './App.css';
import 'semantic-ui-forest-themes/semantic.darkly.min.css';

import trophy from './trophies/trophy_1.svg';
import metamask from './metamask.svg';

class App extends Component {
  state = {
    web3: null,
    accounts: null,
    contract: null,
    search: '',
    loading: false
  };

  componentDidMount = async () => {
    this.setState({ loading: true });

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
      console.error(error);
    }

    this.setState({ loading: false });
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
    const { web3, accounts, contract, search, loading } = this.state;

    if (loading) {
      return <Loader active />;
    }

    if (!web3) {
      return (
        <div className="App">
          <Menu fixed="top">
            <Menu.Item header>
              <Image src={trophy} className="menuHeaderImage" />
              &nbsp;
              TrophyToken
            </Menu.Item>
          </Menu>
          <Container>
            <Card
              centered
              target="_blank"
              href="https://metamask.io/"
              className="installMetaMaskCard"
            >
              <Image fluid src={metamask} />
              <Card.Content>
                <Card.Header>Install MetaMask to continue</Card.Header>
                <Card.Description>MetaMask is required to connect your Ethereum wallet to the TrophyToken DApp.</Card.Description>
              </Card.Content>
            </Card>
          </Container>
        </div>
      );
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
          <Route path="/trophy/:tokenId" render={props => (
            <ViewTrophy
              {...props}
              contract={contract}
            />
          )} />
        </Container>
      </div>
    );
  }
}

export default withRouter(App);
