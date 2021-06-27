import React, {Fragment} from 'react';
import {Form} from '../../components/Form/Form';

import './Settings.scss';
import {Header} from "../../components/Header/Header";

export const Settings = () => {
  return (
    <Fragment>
      <div className="settings">
        <Header title="School CI server"/>
        <div className="settings__subtitle">
          Settings
        </div>
        <div>
          Configure repository connection and synchronization settings.
        </div>
        <Form/>
      </div>
    </Fragment>
  )
}
