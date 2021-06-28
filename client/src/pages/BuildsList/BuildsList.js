import React, {Fragment, useEffect, useState} from 'react';
import {BuildItem} from '../../components/BuildItem/BuildItem';
import {Header} from '../../components/Header/Header';
import {useHistory} from 'react-router-dom';
import useWindowResolution from '../../hooks/useWindowResolution';
import {Link} from "react-router-dom";
import './BuildsList.scss';
import {Modal} from "../../components/Modal/Modal";
import {useDispatch, useSelector} from "react-redux";
import {getList} from "../../actions/list";
import {createBuild, getBuild} from "../../actions/build";
import {setIsFetching} from "../../reducers/listReducer";
import {setCommitHash, setIsFetchingBuild} from "../../reducers/buildReducer";

export const BuildsList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const settings = useSelector(state => state.settings.settings.data.data);
  const list = useSelector(state => state.list.list);
  const isFetching = useSelector(state => state.list.isFetching);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commit, setCommit] = useState('');
  const repoName = settings.repoName.replace('https://github.com/', '');

  useEffect(() => {
    dispatch(getList())
  }, [])

  let commitHash = commit || '';

  const commitHandler = (e) => {
    setCommit(e.target.value)
    commitHash = e.target.value;
  }

  function closeModal() {
    setIsModalOpen(false);
    setCommit('');
  }

  function Chunks() {
    const resolution = useWindowResolution();
    return resolution === 'mobile' ? 5 : 9;
  }

  const chunks = Chunks();

  function onSubmit(e) {
    e.preventDefault();
    dispatch(setIsFetching(true));
    dispatch(createBuild(commitHash))
      .then(() => {
        const lastBuild = list.length ? Number(list[0].buildNumber) + 1 : 1;
        history.push(`/build/${lastBuild}`);
        dispatch(setCommitHash(commitHash))
        closeModal();
        dispatch(setIsFetching(false));
      })
  }

  function onBuildClick(build) {
    dispatch(setIsFetchingBuild(true));
    dispatch(getBuild(build.id))
      .then(() => {
        history.push(`/build/${build.buildNumber}`);
      })
    history.push(`/build/${build.buildNumber}`);
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
          isFetching === false
            ?
            (
              list.length > 0
              ?
              (
                <div className="list__builds">
                  {list.slice(0, chunks).map((build) => (
                    <div className="build"
                          key={build.buildNumber}
                          onClick={() => onBuildClick(build)}
                    >
                      <BuildItem
                        build={build}
                        key={build.buildNumber}
                      />
                    </div>
                  ))}
                  {list.length > chunks && (
                    <button className="ci-btn ci-btn__small list__btn">
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
                        onClick={onSubmit}
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
