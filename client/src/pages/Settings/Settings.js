import React, {useEffect} from 'react';
import {Form} from '../../components/Form/Form';

import './Settings.scss';
import {Header} from "../../components/Header/Header";
import {getSettings} from "../../actions/settings";
import {useDispatch, useSelector} from "react-redux";

export const Settings = () => {
  const dispatch = useDispatch();
  const settings = useSelector(state => state.settings.settings);

  useEffect(() => {
    dispatch(getSettings())
  }, [dispatch])

  return (
    <div className="settings">
      <Header title="School CI server"/>
      <div className="settings__subtitle">
        Settings
      </div>
      <div>
        Configure repository connection and synchronization settings.
      </div>
      <Form settings={settings}/>
    </div>
  )
}
