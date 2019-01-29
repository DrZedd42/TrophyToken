import React, { Component } from 'react';
import { Button, Card, Form, Grid, Header, Image, List, Message, Segment } from 'semantic-ui-react';
import trophies from './utils/trophies';

import './CreateTrophy.css';

class CreateTrophy extends Component {
  state ={
    title: '',
    address: '',
    trophy: 0
  };

  onChange = (e, { name, value }) => this.setState({ [name]: value });

  onTrophyClick = (e, { value }) => this.setState({ trophy: value });

  render() {
    const { title, address, trophy } = this.state;

    const defaultTitle = 'Enter Trophy Title...';

    const trophiesList = trophies.map((src, index) => {
      return (
        <List.Item
          key={index}
          className="trophyListItem"
        >
          <List.Content>
            <Button
              compact
              fluid
              value={index}
              basic={trophy === index}
              onClick={this.onTrophyClick}
            >
              <Image centered src={src} />
            </Button>
          </List.Content>
        </List.Item>
      );
    });

    return (
      <div className="CreateTrophy">
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column width={16}>
              <Header as="h1" textAlign="center">Create New Trophy</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Card fluid className="trophyCard">
                <Card.Content>
                  <Image
                    src={trophies[trophy]}
                    fluid
                    centered
                    className="trophyCardImage"
                  />
                </Card.Content>
                <Card.Content>
                  <Card.Header textAlign="center">
                    {title || defaultTitle}
                  </Card.Header>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Form>
                <Form.TextArea
                  name="title"
                  value={title}
                  label="Title"
                  onChange={this.onChange}
                />
                <Form.Input
                  name="address"
                  value={address}
                  label="Send to address"
                  onChange={this.onChange}
                />
                <Segment className="trophyListSegment">
                  <List horizontal>
                    {trophiesList}
                  </List>
                </Segment>
                <Message error />
                <Form.Button primary fluid size="huge">
                  Send Trophy!
                </Form.Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default CreateTrophy;
