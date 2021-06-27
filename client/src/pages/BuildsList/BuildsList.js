import React, {Fragment, useEffect, useState} from 'react';
import {BuildItem} from '../../components/BuildItem/BuildItem';
import {Header} from '../../components/Header/Header';
import {NavLink} from 'react-router-dom';
import useWindowResolution from '../../hooks/useWindowResolution';
import {Link} from "react-router-dom";
import './BuildsList.scss';
import {Modal} from "../../components/Modal/Modal";
import {useDispatch, useSelector} from "react-redux";
import {getList} from "../../actions/list";
import {sendBuild} from "../../actions/build";

export const BuildsList = () => {
  const dispatch = useDispatch();
  const list = useSelector(state => state.list.list);
  const isFetching = useSelector(state => state.list.isFetching);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commit, setCommit] = useState('');

  useEffect(() => {
    dispatch(getList())
  }, [])

  const commitHandler = (e) => {
    setCommit(e.target.value)
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

  function onSubmit(values) {
    dispatch(sendBuild(values));
    closeModal();
  }

  return (
    <Fragment>
      <Header title="yuli349/my-awesome-repo">
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
              list.length && (
                <div className="list__builds">
                  {list.slice(0, chunks).map((build) => (
                    <NavLink className="build" key={build.buildNumber}
                             to={`/build/${build.buildNumber}`}>
                      <BuildItem
                        build={build}
                      />
                    </NavLink>
                  ))}
                  {list.length > chunks && (
                    <button className="ci-btn ci-btn__small list__btn">
                      <span>Show more</span>
                    </button>
                  )}
                </div>
              )
            )
            :
            <div className="fetching">
              загрузка
            </div>
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
                        onClick={() => onSubmit(commit)}
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
