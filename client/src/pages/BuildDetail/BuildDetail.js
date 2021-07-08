import React, {Fragment, useEffect} from 'react';
import {default as AnsiUp} from 'ansi_up';
import {BuildItem} from '../../components/BuildItem/BuildItem';
import {Header} from '../../components/Header/Header';

import './BuildDetail.scss';
import {NavLink, useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createBuild, getBuild, getBuildLogs} from "../../actions/build";
import {setIsFetchingBuild} from "../../reducers/buildReducer";

export const BuildDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const build = useSelector(state => state.build.build.data);
  const logs = useSelector(state => state.build.logs);
  const isFetching = useSelector(state => state.build.isFetching);
  const ansi_up = new AnsiUp();
  const html = logs ? ansi_up.ansi_to_html(logs) : '';
  const { buildId } = useParams();
  useEffect(() => {
    dispatch(setIsFetchingBuild(true));
    dispatch(getBuild(buildId))
      .then(() => {
        dispatch(getBuildLogs(buildId))
      })
  }, [dispatch, buildId])

  function onSubmit(e) {
    e.preventDefault();
    dispatch(createBuild(build?.commitHash))
      .then((res) => {
        history.push(`/build/${res.data.buildId}`);
      })
  }

  return (
    <Fragment>
      {
        isFetching === false
          ?
          (
            <div className="detail">

              <Fragment>
                <Header title={build?.commitMessage}>
                  <button className="ci-btn ci-btn__small header__btn-rebuild"
                          onClick={onSubmit}>
                    <i className="icon"/> <span>Rebuild</span>
                  </button>

                  <NavLink className="ci-btn ci-btn__small header__btn-settings"
                           to="/settings"><i
                    className="icon"/></NavLink>
                </Header>
                <div className="build">
                  <BuildItem build={build} status={build?.status}/>
                </div>
              </Fragment>

              {html &&
              <div className="detail__logs">
                <pre dangerouslySetInnerHTML={{__html: html}}/>
              </div>
              }
            </div>
          )
          :
          <div className="fetching"/>
      }
    </Fragment>
  )

}
