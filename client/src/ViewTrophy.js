import React, { Component } from 'react';
import { Divider, Header } from 'semantic-ui-react';
import Trophy from './Trophy';

import './ViewTrophy.css';

class ViewTrophy extends Component {
  render() {
    const { match: { params: { tokenId } }, contract } = this.props;

    return (
      <div className="ViewTrophy">
        <Header as="h1" textAlign="center">
          View Trophy
          <Header.Subheader></Header.Subheader>
        </Header>
        <Divider />
        <Trophy contract={contract} tokenId={tokenId} />
      </div>
    );
  }
}

export default ViewTrophy;
