import React from 'react';
import { Route } from 'react-router-dom';
import About from './About';
import Terms from './Terms';
import Privacy from './Privacy';
import CreateTrophy from './CreateTrophy';
import ViewAccountTrophies from './ViewAccountTrophies';
import ViewTrophy from './ViewTrophy';

export default props => {
  return (
    <>
      <Route exact path="/" component={About} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/create" component={CreateTrophy} />
      <Route path="/view/:address" render={props => (
        <ViewAccountTrophies
          {...props}
          key={props.match.params.address}
        />
      )} />
      <Route path="/trophy/:tokenId" component={ViewTrophy} />
    </>
  );
};
