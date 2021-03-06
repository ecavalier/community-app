/**
 * Routing of Cognitive Community.
 */

import ChallengeDetails from 'routes/ChallengeDetails';
import ChallengeListing from 'routes/Communities/ChallengeListing';
import Error404 from 'components/Error404';
import Resources from 'components/tc-communities/communities/cognitive/Resources';
import Footer from 'components/tc-communities/communities/cognitive/Footer';
import Header from 'containers/tc-communities/Header';
import Home from 'components/tc-communities/communities/cognitive/Home';
import Learn from 'components/tc-communities/communities/cognitive/Learn';
import GetStarted from 'components/tc-communities/communities/cognitive/GetStarted';
import PT from 'prop-types';
import React from 'react';
import Submission from 'routes/Submission';
import SubmissionManagement from 'routes/SubmissionManagement';
import { Route, Switch } from 'react-router-dom';

import headerTheme from 'components/tc-communities/communities/cognitive/header.scss';

import style from './style.scss';

export default function Cognitive({ base, member, meta }) {
  return (
    <Route
      component={({ match }) => (
        <div>
          <div className={style.back} />
          <Header
            baseUrl={base}
            pageId={match.params.pageId || 'home'}
            theme={headerTheme}
          />
          <Switch>
            <Route
              component={() => (
                <div>
                  {
                    ChallengeListing({
                      challengesUrl: `${base}/challenges`,
                      meta,
                      listingOnly: true,
                      newChallengeDetails: true,
                    })
                  }
                </div>
              )}
              exact
              path={`${base}/challenges`}
            />
            <Route
              component={GetStarted}
              exact
              path={`${base}/getstarted`}
            />
            <Route
              component={routeProps => ChallengeDetails({
                ...routeProps,
                challengesUrl: `${base}/challenges`,
              })}
              exact
              path={`${base}/challenges/:challengeId(\\d{8})`}
            />
            <Route
              component={routeProps => Submission({
                ...routeProps,
                challengesUrl: `${base}/challenges`,
              })}
              exact
              path={`${base}/challenges/:challengeId(\\d{8})/submit`}
            />
            <Route
              component={routeProps => SubmissionManagement({
                ...routeProps,
                challengesUrl: `${base}/challenges`,
              })}
              exact
              path={`${base}/challenges/:challengeId(\\d{8})/my-submissions`}
            />
            <Route
              component={() => <Resources member={member} />}
              exact
              path={`${base}/resources`}
            />
            <Route
              component={Learn}
              exact
              path={`${base}/learn`}
            />
            <Route
              component={Home}
              exact
              path={`${base}/home`}
            />
            <Route
              component={Error404}
              path={`${base}/:any`}
            />
            <Route
              component={Home}
              exact
              path={`${base}`}
            />
          </Switch>
          <Footer />
        </div>
      )}
      path={`${base}/:pageId?`}
    />
  );
}

Cognitive.defaultProps = {
  base: '',
};

Cognitive.propTypes = {
  base: PT.string,
  member: PT.bool.isRequired,
  meta: PT.shape().isRequired,
};
