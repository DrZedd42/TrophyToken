import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';
import trophies from './utils/trophies';

import './Trophy.css';

class Trophy extends Component {
  state = {
    title: '',
    trophy: 0
  }

  async componentDidMount() {
    const { contract, tokenId } = this.props;
    const data = await contract.methods.getTokenData(tokenId).call();
    this.setState({ title: data[0], trophy: parseInt(data[1]) });
  }

  render() {
    const { title, trophy } = this.state;

    return (
      <Card className="trophyCard">
        <Card.Content>
          <Image
            src={trophies[trophy]}
            fluid
            centered
            verticalAlign="bottom"
            className="trophyCardImage"
          />
        </Card.Content>
        <Card.Content>
          <Card.Header textAlign="center">{title}</Card.Header>
        </Card.Content>
      </Card>
    );
  }
}

export default Trophy;
