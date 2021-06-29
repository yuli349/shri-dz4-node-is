import React, {Fragment, useEffect} from 'react';
import {default as AnsiUp} from 'ansi_up';
import {BuildItem} from '../../components/BuildItem/BuildItem';
import {Header} from '../../components/Header/Header';

import './BuildDetail.scss';
import {NavLink, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createBuild, getBuild} from "../../actions/build";
import {setIsFetchingBuild} from "../../reducers/buildReducer";

export const BuildDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const list = useSelector(state => state.list.list);
  const build = useSelector(state => state.build.build.data);
  const isFetching = useSelector(state => state.build.isFetching);
  const ansi_up = new AnsiUp();
  let html = build?.buildLog ? ansi_up.ansi_to_html(build.buildLog) : '';
  const buildId = localStorage.getItem('buildId');
  useEffect(() => {
    dispatch(setIsFetchingBuild(true));
    dispatch(getBuild(JSON.parse(buildId)));
  }, [dispatch, buildId])

  const lastBuild = Number(list[0]?.buildNumber) + 1;

  function onSubmit(e) {
    e.preventDefault();
    dispatch(createBuild(build?.commitHash))
      .then(() => {
        history.push(`/build/${lastBuild}`);
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
                  <BuildItem build={build}/>
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
