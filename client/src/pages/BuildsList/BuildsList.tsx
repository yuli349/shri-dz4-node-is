import React, {Fragment, useEffect, useState} from 'react';
import {BuildItem} from '../../components/BuildItem/BuildItem';
import {Header} from '../../components/Header/Header';
import {useHistory} from 'react-router-dom';
import useWindowResolution from '../../hooks/useWindowResolution';
import {Link} from "react-router-dom";
import {getBuilds, Status} from "../../types/list";
import {BuildConfig} from "../../types/build";
import './BuildsList.scss';
import {Modal} from "../../components/Modal/Modal";
import {useDispatch} from "react-redux";
import {getList} from "../../store/actions/list";
import {createBuild} from "../../store/actions/build";
import {setCommitHash} from "../../store/reducers/buildReducer";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

type State = { a: string }; // your state type
type AppDispatch = ThunkDispatch<State, any, AnyAction>;

export const BuildsList = () => {
  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();
  const {settings} = useTypedSelector(state => state.settings);
  const {list, isFetching} = useTypedSelector(state => state.list);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commit, setCommit] = useState('');
  const [offset, setOffset] = useState(0);
  const repoName = settings?.data?.data?.repoName?.replace('https://github.com/', '');

  function Chunks() {
    const resolution = useWindowResolution();
    if (resolution === 'desktop') {
      return 9;
    } else if (resolution === 'mobile') {
      return 5;
    }
  }
  let chunks: number | undefined;
  chunks = Chunks();

  useEffect(() => {
    if (chunks) {
      dispatch(getList(offset, chunks));
    }

  }, [dispatch, offset, chunks])

  let commitHash = commit || '';

  const commitHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommit(e.target.value)
    commitHash = e.target.value;
  }

  function closeModal() {
    setIsModalOpen(false);
    setCommit('');
  }

  function showMoreBuilds() {
    if (chunks) {
      let count = offset + chunks
      setOffset(count);
    }
  }

  function onSubmit(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    dispatch(createBuild(commitHash))
    .then((res: BuildConfig) => {
        history.push(`/build/${res?.data?.id}`);
        dispatch(setCommitHash(commitHash))
        closeModal();
      })
  }

  function onBuildClick(build: getBuilds<Status>) {
    history.push(`/build/${build.id}`);
  }

  return (
    <Fragment>
      <Header title={repoName}>
        <button className="ci-btn ci-btn__small header__btn-build"
                onClick={() => setIsModalOpen(true)}>
          <i className="icon"/> <span>Run build</span>
        </button>

        <Link className="ci-btn ci-btn__small header__btn-settings"
              to="/settings"><i
          className="icon"/></Link>
      </Header>
      <div className="list">
        {
          !isFetching
            ?
            (
              list?.length > 0
              ?
              (
                <div className="list__builds">
                  {list.map((build: getBuilds<Status>) => (
                    <div className="build" key={build?.buildNumber}
                         onClick={() => onBuildClick(build)}>
                      <BuildItem
                        build={build}
                        status={build.status}
                        key={build?.buildNumber}
                      />
                    </div>
                  ))}
                  {list[0]?.buildNumber > list.length && (
                    <button className="ci-btn ci-btn__small list__btn"
                            onClick={() => showMoreBuilds()}>
                      <span>Show more</span>
                    </button>
                  )}
                </div>
              )
                :
                <div>The list of builds is empty</div>
            )
            :
            <div className="fetching"/>
        }
      </div>

      {isModalOpen && (
        <Modal>
          <div className="modal__title">New build</div>
          <div className="modal__form">
            <form>
              <div className="base-input">
                <label>
                  <div className='label'>the commit hash which you want to
                    build.
                  </div>
                  <div className="form-input">
                    <input className="ci-input"
                           type='text'
                           name='commit'
                           value={commit}
                           onChange={e => commitHandler(e)}
                           placeholder='Commit hash'
                    />
                    {commit !== '' &&
                    <i className="icon-clear" onClick={() => setCommit('')}/>
                    }
                  </div>
                </label>
              </div>
              <div className="form__btns">
                <button disabled={commit === ''}
                        onClick={() => onSubmit}
                        className="ci-btn ci-btn__big ci-btn__yellow">
                  <span>Run build</span>
                </button>
                <button className="ci-btn ci-btn__big"
                        onClick={() => closeModal()}>
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </Fragment>
  )
}
