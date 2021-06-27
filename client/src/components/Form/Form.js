import React, {Fragment, useState, useEffect} from 'react';
import {NavLink, useHistory } from 'react-router-dom';
import './Form.scss';
import {Route} from "react-router-dom";
import MaskedInput from 'react-text-mask';
import {postSettings} from "../../actions/settings";
import {useDispatch} from "react-redux";

export const Form = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [repository, setRepository] = useState('');
  const [command, setCommand] = useState('');
  const [branch, setBranch] = useState('');
  const [period, setPeriod] = useState('');
  const [repositoryDirty, setRepositoryDirty] = useState(false);
  const [commandDirty, setCommandDirty] = useState(false);
  const [repositoryError, setRepositoryError] = useState('Обязательное поле для ввода');
  const [commandError, setCommandError] = useState('Обязательное поле для ввода');
  const [formValid, setFormValid] = useState(false);

  let submitJson = {
    "repoName": repository || '',
    "buildCommand": command || '',
    "mainBranch": branch || '',
    "period": period || 0
  }

  useEffect(() => {
    (commandError || repositoryError) ? setFormValid(false) : setFormValid(true);
  }, [commandError, repositoryError])

  const repositoryHandler = (e) => {
    setRepository(e.target.value);
    submitJson.repoName = e.target.value;
    e.target.value.length
      ? setRepositoryError('')
      : setRepositoryError('Обязательное поле для ввода');
  }

  const commandHandler = (e) => {
    setCommand(e.target.value);
    submitJson.buildCommand = e.target.value;
    e.target.value.length
      ? setCommandError('')
      : setCommandError('Обязательное поле для ввода');
  }

  const branchHandler = (e) => {
    setBranch(e.target.value);
    submitJson.mainBranch = e.target.value;
  }

  const periodHandler = (e) => {
    setPeriod(e.target.value);
    submitJson.period = e.target.value;
  }

  const blurHandler = (e) => {
    if (e.target.name === 'repository') {
      setRepositoryDirty(true);
    } else if (e.target.name === 'command') {
      setCommandDirty(true);
    }
  }

  function clearInput(fn, fnDirty, fnError) {
    fn('');
    fnDirty(false);
    fnError('Обязательное поле для ввода');
  }

  function onSubmit(e) {
    e.preventDefault();
    dispatch(postSettings(submitJson))
      .then(() => {
        history.push('/');
      })

  }

  return (
    <Fragment>
      <div className="form">
        <form>
          <div className="base-input">
            <label>
              <div className='label'>GitHub repository<i>*</i></div>
              <div className="form-input">
                <input className="ci-input"
                       type='text'
                       name='repository'
                       value={repository}
                       onBlur={e => blurHandler(e)}
                       onChange={e => repositoryHandler(e)}
                       placeholder="user-name/repo-name"
                />
                {repository !== '' &&
                <i className="icon-clear"
                   onClick={() => clearInput(setRepository, setRepositoryDirty, setRepositoryError)}/>
                }
                {(repositoryDirty && repositoryError) &&
                <div className="error-message"
                     style={{color: 'red'}}>{repositoryError}</div>}
              </div>
            </label>
          </div>
          <div className="base-input">
            <label>
              <div className='label'>Build command<i>*</i></div>
              <div className="form-input">
                <input className="ci-input"
                       type='text'
                       name='command'
                       value={command}
                       onBlur={e => blurHandler(e)}
                       onChange={e => commandHandler(e)}
                       placeholder="build command"
                />
                {command !== '' &&
                <i className="icon-clear"
                   onClick={() => clearInput(setCommand, setCommandDirty, setCommandError)}/>
                }
                {(commandDirty && commandError) &&
                <div className="error-message"
                     style={{color: 'red'}}>{commandError}</div>}
              </div>
            </label>
          </div>
          <div className="base-input">
            <label>
              <div className='label'>Main branch</div>
              <div className="form-input">
                <input className="ci-input"
                       type='text'
                       name='branch'
                       value={branch}
                       onChange={e => branchHandler(e)}
                       placeholder="user-name/repo-name"
                />
                {branch !== '' &&
                <i className="icon-clear" onClick={() => setBranch('')}/>
                }
              </div>
            </label>
          </div>
          <div className="small-input">
            <label>Synchronize every</label>
            <MaskedInput className="ci-input"
                   mask={[/[1-9]/, /\d/, /\d/]}
                   name='period'
                   type='text'
                   guide={false}
                   value={period}
                   onChange={e => periodHandler(e)}
                   placeholder="0"
            />
            <span>minutes</span>
          </div>
          <div className="form__btns">
            <button className="ci-btn ci-btn__big ci-btn__yellow"
                    onClick={onSubmit}
                    disabled={!formValid}>
              <span>Save</span>
            </button>
            <NavLink to="/" className="ci-btn ci-btn__big">
              <span>Cancel</span>
            </NavLink>
          </div>
        </form>
      </div>
    </Fragment>
  )
}