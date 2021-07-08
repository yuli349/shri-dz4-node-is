import React from 'react';

import './Main.scss';
import {Route, Switch} from "react-router-dom";
import {BuildDetail} from "../../pages/BuildDetail/BuildDetail";
import {MainPage} from "../MainPage/MainPage";
import {Settings} from "../../pages/Settings/Settings";

export const Main = () => {
  return (
    <div className="main">
      <div className="wrapper">
        <Switch>
          <Route path={'/'} exact component={MainPage}/>
          <Route path={'/build/:buildId'} component={BuildDetail}/>
          <Route path={'/settings'} component={Settings}/>
        </Switch>
      </div>
    </div>
  )
}
