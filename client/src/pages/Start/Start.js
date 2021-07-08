import React from 'react';
import {Header} from "../../components/Header/Header";
import './Start.scss';
import {NavLink} from "react-router-dom";

export const Start = () => {
  return (
    <div className="start">
      <Header title="School CI server">
        <NavLink data-testId="link-settings" className="ci-btn ci-btn__small header__btn-settings"
                 to="/settings"><i
          className="icon"/><span>Settings</span></NavLink>
      </Header>
      <div className="start__content">
        <div className="start__center">
          <div className="start__center-logo"/>
          <div>Configure repository connection
            and synchronization settings
          </div>
          <NavLink data-testId="open-settings" to="/settings" className="ci-btn ci-btn__big ci-btn__yellow">
            <span>Open settings</span>
          </NavLink>
        </div>
      </div>
    </div>
  )
}
