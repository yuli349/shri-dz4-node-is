import React, {Fragment, useEffect} from 'react';

import {Start} from "../../pages/Start/Start";
import {getSettings} from '../../actions/settings';
import {BuildsList} from "../../pages/BuildsList/BuildsList";
import {useDispatch, useSelector} from "react-redux";

export const MainPage = () => {
  const dispatch = useDispatch();
  const settings = useSelector(state => state.settings.settings);
  const isFetching = useSelector(state => state.settings.isFetching);

  const settingsData = settings?.data?.data;

  useEffect(() => {
    dispatch(getSettings())
  }, [dispatch])

  return (
    <Fragment>
      {
        isFetching === false
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
