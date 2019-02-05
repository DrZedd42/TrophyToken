import React from 'react';
import {
  Button,
  Card,
  Divider,
  Grid,
  Header,
  Image,
  Item,
  List,
  Segment
} from 'semantic-ui-react';
import Layout from './Layout';

import './About.css';

import trophy from './trophies/trophy_8.svg';
import trophy_10 from './trophies/trophy_10.svg';
import trophy_14 from './trophies/trophy_14.svg';
import trophy_16 from './trophies/trophy_16.svg';
import ethereumLogo from './ETHEREUM-ICON_Black_small.png';

export default () => {
  return (
    <Layout>
      <div className="About">
        <Segment padded size="large">
          <Grid centered>
            <Grid.Row>
              <Grid.Column width={3} >
                <Image src={trophy} size="small" floated="right" />
              </Grid.Column>
              <Grid.Column width={11} >
                <Header as="h1" className="BigHeader">
                  TrophyToken
                  <Header.Subheader>
                    Create custom digital trophies with Ethereum.
                  </Header.Subheader>
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={15} textAlign="center">
                <Button size="big" primary>Create New Trophy</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Divider hidden />

        <Header as="h1" textAlign="center">
          Send custom trophies to your friends
          <Header.Subheader>
            Write your own inscription and select from a variety of trophy types.
          </Header.Subheader>
        </Header>
        <Card.Group centered itemsPerRow={3}>
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
              <Card.Header textAlign="center">The Top 10 Whale Award</Card.Header>
            </Card.Content>
          </Card>
          <Card className="trophyCard" fluid>
            <Card.Content>
              <Image
                src={trophy_14}
                fluid
                centered
                className="trophyCardImage"
              />
            </Card.Content>
            <Card.Content>
              <Card.Header textAlign="center">Medal For Shitcoin Trading Bravery</Card.Header>
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
              <Card.Header textAlign="center">The 2018 Crash HODL Trophy</Card.Header>
            </Card.Content>
          </Card>
        </Card.Group>

        <Divider hidden section />

        <Grid centered>
          <Grid.Row>
            <Grid.Column width={9}>
              <Item.Group>
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
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Divider hidden section />
      </div>
    </Layout>
  );
};
