import React, { Component } from 'react';
import withWeb3 from './withWeb3';
import { NavLink } from 'react-router-dom';
import { toClass } from 'recompose';
import {
  Button,
  Card,
  Container,
  Divider,
  Header,
  Image,
  Item,
  Segment
} from 'semantic-ui-react';
import Layout from './Layout';

import './About.css';

import trophy from './trophies/trophy_8.svg';
import trophy_10 from './trophies/trophy_10.svg';
import trophy_12 from './trophies/trophy_12.svg';
import trophy_16 from './trophies/trophy_16.svg';
import ethereumLogo from './ETHEREUM-ICON_Black_small.png';

class About extends Component {
  state = {
    tokenPrice: ''
  }

  async componentWillReceiveProps() {
    const { contract } = this.props;

    if (contract) {
      try {
        const tokenPrice = await contract.methods.tokenPrice().call();
        this.setState({ tokenPrice });
      } catch(error) {
        console.log(error);
      }
    }
  }

  render() {
    const { web3, accounts } = this.props;

    let { tokenPrice } = this.state;
    tokenPrice = web3 && web3.utils.fromWei(tokenPrice, 'ether');

    return (
      <Layout web3={web3} accounts={accounts}>
        <div className="About">
          <Segment
            inverted
            vertical
            padded="very"
            size="large"
            textAlign="center"
          >
            <Container>
              <Image src={trophy} size="small" centered />
              <Header as="h1" className="BigHeader">
                TrophyToken
                <Header.Subheader>
                  Awards on the blockchain.
                </Header.Subheader>
              </Header>
              <Divider hidden />
              <Button size="big" primary as={toClass(NavLink)} to="/create">
                Create New Trophy
              </Button>
            </Container>
          </Segment>

          <Divider hidden />

          <Container>
            <Header as="h1" textAlign="center">
              Create custom digital trophies with Ethereum
              <Header.Subheader>
                Send the trophies to your friends or keep them yourself.
              </Header.Subheader>
            </Header>

            <Divider hidden />

            <Card.Group centered stackable itemsPerRow={4}>
              <Card className="trophyCard" fluid>
                <Card.Content>
                  <Image
                    src={trophy_16}
                    fluid
                    centered
                    className="trophyCardImage"
                  />
                </Card.Content>
                <Card.Content>
                  <Card.Header textAlign="center">
                    The Top 10 Whale Award
                  </Card.Header>
                </Card.Content>
              </Card>
              <Card className="trophyCard" fluid>
                <Card.Content>
                  <Image
                    src={trophy_12}
                    fluid
                    centered
                    className="trophyCardImage"
                  />
                </Card.Content>
                <Card.Content>
                  <Card.Header textAlign="center">
                    Master Shitcoin Trader Shield
                  </Card.Header>
                </Card.Content>
              </Card>
              <Card className="trophyCard" fluid>
                <Card.Content>
                  <Image
                    src={trophy_10}
                    fluid
                    centered
                    className="trophyCardImage"
                  />
                </Card.Content>
                <Card.Content>
                  <Card.Header textAlign="center">
                    The 2018 Crash HODL Trophy
                  </Card.Header>
                </Card.Content>
              </Card>
            </Card.Group>

            <Divider hidden section />

            <Header as="h1" textAlign="center">
              New trophies for only &Xi;{tokenPrice}
              <Header.Subheader>
                Write your own inscription and select from a variety of trophy types.
              </Header.Subheader>
            </Header>

            <Divider hidden section />

            <Container text>
              <Item.Group unstackable>
                <Item>
                  <Item.Image src={ethereumLogo} size="mini" />
                  <Item.Content verticalAlign="middle">
                    <Item.Header>ERC-721 Token</Item.Header>
                    <Item.Description>
                      Each trophy is a unique ERC-721 non-fungible token on the Ethereum blockchain.
                    </Item.Description>
                  </Item.Content>
                </Item>
              </Item.Group>
            </Container>
          </Container>
        </div>
      </Layout>
    );
  }
}

export default withWeb3(About);
