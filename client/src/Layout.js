import React from 'react';
import { Container } from 'semantic-ui-react';
import Navigation from './Navigation';

export default props => {
    const { web3, accounts } = props;

    return (
      <>
        <Navigation web3={web3} accounts={accounts} />
        <Container>
          {props.children}
        </Container>
      </>
    );
};
