import React from 'react';
import { Card, Image, } from 'semantic-ui-react';
import Layout from './Layout';

import metamask from './metamask.svg';

export default () => {
  return (
    <Layout>
      <Card
        centered
        target="_blank"
        href="https://metamask.io/"
        className="installMetaMaskCard"
      >
        <Image fluid src={metamask} />
        <Card.Content>
          <Card.Header>Install MetaMask to continue</Card.Header>
          <Card.Description>MetaMask is required to connect your Ethereum wallet to the TrophyToken DApp.</Card.Description>
        </Card.Content>
      </Card>
    </Layout>
  );
};
