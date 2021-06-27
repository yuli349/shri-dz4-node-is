import React, {Fragment, useEffect} from 'react';
import {default as AnsiUp} from 'ansi_up';
import {BuildItem} from '../../components/BuildItem/BuildItem';
import {Header} from '../../components/Header/Header';

import './BuildDetail.scss';
import {NavLink, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createBuild, getBuild} from "../../actions/build";
import {setIsFetching} from "../../reducers/listReducer";

export const BuildDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const build = useSelector(state => state.build.build);
  const isFetching = useSelector(state => state.build.isFetching);
  const hash = useSelector(state => state.build.commitHash);
  const ansi_up = new AnsiUp();
  let html = ansi_up.ansi_to_html(build.buildLog);

  console.log(hash);

  // useEffect(() => {
  //   dispatch(setIsFetching(true));
  //   dispatch(getBuild('bca4e0c8-70e5-4b54-abfd-64b704108f9b'));
  // }, [])

  function onSubmit(e) {
    e.preventDefault();
    dispatch(setIsFetching(true))
    dispatch(createBuild(hash))
      .then(() => {
        dispatch(setIsFetching(false));
        const lastBuild = Number(build.buildNumber) + 1;
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
              <Header title={build.commitMessage}>
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
