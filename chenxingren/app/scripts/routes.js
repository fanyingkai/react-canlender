import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import createHistory from 'history/lib/createHashHistory'

import App from './pages/app.jsx';
import ActivityProgress from './pages/activityProgress.jsx';
import ActivityIntro from './pages/activityIntro.jsx';
import Calender from './pages/calender.jsx';
import NotFound from './pages/notFound.jsx';
import baseConst from  './components/baseConst.js'
import $ from './components/jquery.js'

const historyOptions = {
  queryKey : true
};

const api_host='http://api-activity.mi-ae.com.cn';

const routes = (
  <Router history={createHistory(historyOptions)}>
    <Route path='/' component={ App }>
      <IndexRoute component={ ActivityProgress }/>
      <Route path='acticityProgress' component={ ActivityProgress } />
      <Route path='calender' component={ Calender } />
      <Route path='activityIntro' component={ ActivityIntro } />
      <Route path='*' component={NotFound}/>
    </Route>
  </Router>
);

export default routes;