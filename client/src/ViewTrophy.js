import React, { Component } from 'react';
import withWeb3 from './withWeb3';
import { Container, Divider, Header } from 'semantic-ui-react';
import Layout from './Layout';
import Trophy from './Trophy';

import './ViewTrophy.css';

class ViewTrophy extends Component {
  render() {
    const {
      match: { params: { tokenId } },
      web3,
      accounts,
      contract
    } = this.props;

    return (
      <Layout web3={web3} accounts={accounts}>
        <Container>
          <div className="ViewTrophy">
            <Header as="h1" textAlign="center">
              View Trophy
              <Header.Subheader></Header.Subheader>
            </Header>
            <Divider />
            <Trophy contract={contract} tokenId={tokenId} />
          </div>
        </Container>
      </Layout>
    );
  }
}

export default withWeb3(ViewTrophy, true);
