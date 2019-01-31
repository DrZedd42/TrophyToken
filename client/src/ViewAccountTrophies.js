import React, { Component } from 'react';
import { Card, Divider, Header } from 'semantic-ui-react';
import Trophy from './Trophy';

class ViewAccountTrophies extends Component {
  state = {
    trophies: []
  }

  async componentDidMount() {
    const { match: { params: { address } }, contract } = this.props;

    const balance = await contract.methods.balanceOf(address).call();
    const trophies = await Promise.all(
      Array.from(Array(parseInt(balance)).keys()).reverse().map(index => {
        return contract.methods.tokenOfOwnerByIndex(address, index).call();
      })
    );

    this.setState({ trophies });
  }

  render() {
    const {
      match: { params: { address } },
      accounts,
      contract
    } = this.props;

    const { trophies } = this.state;

    const titleAddress = address === accounts[0] ? 'My' : 'Address';

    const trophyList = trophies.map(trophy => {
      return <Trophy key={trophy} contract={contract} tokenId={trophy} link />
    });

    return (
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
    );
  }
}

export default ViewAccountTrophies;
