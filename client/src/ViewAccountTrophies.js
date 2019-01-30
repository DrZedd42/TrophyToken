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
      Array(parseInt(balance)).fill().map((element, index) => {
        return contract.methods.tokenOfOwnerByIndex(address, index).call();
      })
    );

    this.setState({ trophies });
  }

  render() {
    const { contract } = this.props;
    const { trophies } = this.state;

    const trophyList = trophies.map(trophy => {
      return <Trophy key={trophy} contract={contract} tokenId={trophy} />
    });

    return (
      <div className="ViewAccountTrophies">
        <Header as="h1" textAlign="center">View My Trophies</Header>
        <Divider />
        <Card.Group stackable>
          {trophyList}
        </Card.Group>
      </div>
    );
  }
}

export default ViewAccountTrophies;
