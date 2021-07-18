import React, {useEffect} from 'react';
import {Form} from '../../components/Form/Form';
import {useTypedSelector} from "../../hooks/useTypedSelector";

import './Settings.scss';
import {Header} from "../../components/Header/Header";
import {getSettings} from "../../store/actions/settings";
import {useDispatch} from "react-redux";

export const Settings = () => {
  const {settings} = useTypedSelector(state => state.settings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSettings());
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
