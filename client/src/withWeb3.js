import React, { Component } from 'react';
import getWeb3 from './utils/getWeb3';
import MetaMask from './MetaMask';
import TrophyToken from './contracts/TrophyToken.json';
import { Dimmer, Loader } from 'semantic-ui-react';

/**
 * WrappedComponent should use componentWillReceiveProps to implement web3
 * calls instead of componentDidMount.
 */
function withWeb3(WrappedComponent) {
  return class extends Component {
    state = {
      web3: null,
      accounts: null,
      contract: null,
      loading: false
    };

    async componentDidMount() {
      this.setState({ loading: true });

      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = TrophyToken.networks[networkId];
        const contract = new web3.eth.Contract(
          TrophyToken.abi,
          deployedNetwork && deployedNetwork.address,
        );

        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        this.setState({ web3, accounts, contract });
      } catch (error) {
        // Catch any errors for any of the above operations.
        console.error(error);
      }

      this.setState({ loading: false });
    };

    render() {
      const { web3, accounts, contract, loading } = this.state;

      if (!web3 && !loading) {
        return <MetaMask />;
      }

      return (
        <>
          <Dimmer active={loading} page>
            <Loader />
          </Dimmer>
          <WrappedComponent
            {...this.props}
            web3={web3}
            accounts={accounts}
            contract={contract}
          />
        </>
      );
    }
  }
}

export default withWeb3;
