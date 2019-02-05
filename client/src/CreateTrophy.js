import React, { Component } from 'react';
import withWeb3 from './withWeb3';
import {
  Button,
  Card,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Image,
  List,
  Message,
  Segment
} from 'semantic-ui-react';
import Layout from './Layout';
import trophies from './utils/trophies';

import './Trophy.css';
import './CreateTrophy.css';

class CreateTrophy extends Component {
  state ={
    title: '',
    address: '',
    trophy: 0,
    loading: false,
    errorMessage: ''
  };

  onChange = (e, { name, value }) => this.setState({ [name]: value });

  onTrophyClick = (e, { value }) => {
    e.preventDefault();
    this.setState({ trophy: value });
  };

  onSubmit = async event => {
    this.setState({ loading: true, errorMessage: '' });

    const { accounts, contract } = this.props;
    const { title, address, trophy } = this.state;

    try {
      await contract.methods.mint(address, title, trophy).send({
        from: accounts[0]
      });

      this.setState({ title: '', address: '', trophy: 0 });
    } catch(error) {
      this.setState({ errorMessage: error.message });
    }

    this.setState({ loading: false });
  }

  render() {
    const { web3, accounts } = this.props;
    const { title, address, trophy, loading, errorMessage } = this.state;

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
      <Layout web3={web3} accounts={accounts}>
        <Container>
          <div className="CreateTrophy">
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column width={16}>
                  <Header as="h1" textAlign="center">Create New Trophy</Header>
                  <Divider fitted />
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
                  <Form
                    loading={loading}
                    error={!!errorMessage}
                    onSubmit={this.onSubmit}
                  >
                    <Form.TextArea
                      required
                      name="title"
                      value={title}
                      label="Trophy title"
                      onChange={this.onChange}
                    />
                    <Form.Input
                      required
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
                    <Message error header="Error" content={errorMessage} />
                    <Form.Button primary fluid size="huge">
                      Send Trophy!
                    </Form.Button>
                  </Form>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </Container>
      </Layout>
    );
  }
}

export default withWeb3(CreateTrophy);
