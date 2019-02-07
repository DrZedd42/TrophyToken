import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
import trophies from './utils/trophies';

import './Trophy.css';

class Trophy extends Component {
  state = {
    title: '',
    trophy: 0
  }

  getTokenData = async () => {
    const { contract, tokenId } = this.props;

    if (contract) {
      try {
        const data = await contract.methods.getTokenData(tokenId).call();
        this.setState({ title: data[0], trophy: parseInt(data[1]) });
      } catch(error) {
        console.log(error);
      }
    }
  };

  componentDidMount() {
    this.getTokenData();
  }

  componentWillReceiveProps() {
    this.getTokenData();
  }

  render() {
    const { tokenId, link } = this.props;
    const { title, trophy } = this.state;

    let linkProps = {};
    if (link) {
      linkProps = {
        as: Link,
        to: `/trophy/${tokenId}`
      }
    }

    return (
      <Card
        {...linkProps}
        className="trophyCard"
        fluid
      >
        <Card.Content>
          <Image
            src={trophies[trophy]}
            fluid
            centered
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
