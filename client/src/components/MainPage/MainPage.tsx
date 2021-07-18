import React, {Fragment, useEffect} from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {Start} from "../../pages/Start/Start";
import {getSettings} from '../../store/actions/settings';
import {BuildsList} from "../../pages/BuildsList/BuildsList";
import {useDispatch} from "react-redux";

export const MainPage = () => {
  const {settings, isFetching} = useTypedSelector(state => state.settings);
  const dispatch = useDispatch();
  const settingsData = settings;

  useEffect(() => {
    dispatch(getSettings());
  }, [dispatch])

  return (
    <Fragment>
      {
        !isFetching
          ?
          <Fragment>{!settingsData?.repoName && !settingsData?.buildCommand
            ?
            <Start/>
            :
            <BuildsList/>
          }</Fragment>
          :
          <div className="fetching"/>
      }
    </Fragment>
  )
}
