import React, { Component } from 'react';
import withWeb3 from './withWeb3';
import { Card, Container, Divider, Header } from 'semantic-ui-react';
import Layout from './Layout';
import Trophy from './Trophy';

class ViewAccountTrophies extends Component {
  state = {
    trophies: []
  }

  async componentWillReceiveProps() {
    const { match: { params: { address } }, contract } = this.props;

    if (contract) {
      const balance = await contract.methods.balanceOf(address).call();
      const trophies = await Promise.all(
        Array.from(Array(parseInt(balance)).keys()).reverse().map(index => {
          return contract.methods.tokenOfOwnerByIndex(address, index).call();
        })
      );

      this.setState({ trophies });
    }
  }

  render() {
    const {
      match: { params: { address } },
      web3,
      accounts,
      contract
    } = this.props;

    const { trophies } = this.state;

    const titleAddress = address === (accounts && accounts[0])
      ? 'My' : 'Address';

    const trophyList = trophies.map(trophy => {
      return <Trophy key={trophy} contract={contract} tokenId={trophy} link />
    });

    return (
      <Layout web3={web3} accounts={accounts}>
        <Container>
          <div className="ViewAccountTrophies">
            <Header as="h1" textAlign="center">
              View {titleAddress} Trophies
              <Header.Subheader>{address}</Header.Subheader>
            </Header>
            <Divider />
            <Card.Group stackable itemsPerRow={3}>
              {trophyList}
            </Card.Group>
          </div>
        </Container>
      </Layout>
    );
  }
}

export default withWeb3(ViewAccountTrophies, true);
