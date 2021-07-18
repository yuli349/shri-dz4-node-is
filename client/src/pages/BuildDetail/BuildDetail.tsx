import React, {Fragment, useEffect} from 'react';
import {default as AnsiUp} from 'ansi_up';
import {BuildItem} from '../../components/BuildItem/BuildItem';
import {Header} from '../../components/Header/Header';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {BuildConfig} from "../../types/build";
import './BuildDetail.scss';
import {NavLink, useHistory, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {createBuild, getBuild, getBuildLogs} from "../../store/actions/build";
import {setIsFetchingBuild} from "../../store/reducers/buildReducer";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

type State = { a: string }; // your state type
type AppDispatch = ThunkDispatch<State, any, AnyAction>;

export const BuildDetail = () => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const {build, logs, isFetching} = useTypedSelector(state => state.build);
  const ansi_up = new AnsiUp();
  const html = logs ? ansi_up.ansi_to_html(logs) : '';
  const {buildId} = useParams<{ buildId: string }>();
  useEffect(() => {
    dispatch(setIsFetchingBuild(true));
    dispatch(getBuild(buildId))
      .then(() => {
        dispatch(getBuildLogs(buildId))
      })
  }, [dispatch, buildId])

  function onSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    e.preventDefault();
    dispatch(createBuild(build?.commitHash))
      .then((res: BuildConfig) => {
        history.push(`/build/${res?.data?.buildId}`);
      })
  }

  return (
    <Fragment>
      {
        !isFetching
          ?
          (
            <div className="detail">
              <Fragment>
                <Header title={build?.commitMessage} page="detail">
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
