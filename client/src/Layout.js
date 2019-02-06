import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

export default props => {
    const { web3, accounts } = props;

    return (
      <>
        <Navigation web3={web3} accounts={accounts}>
          {props.children}
          <Footer />
        </Navigation>
      </>
    );
};
