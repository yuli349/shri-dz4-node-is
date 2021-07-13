import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import './Form.scss';
import MaskedInput from 'react-text-mask';
import {postSettings} from "../../actions/settings";
import {useDispatch, useSelector} from "react-redux";

export const Form = ({settings}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isFetching = useSelector(state => state.settings.isFetching);
  const [repository, setRepository] = useState(settings?.repoName);
  const [command, setCommand] = useState(settings?.buildCommand);
  const [branch, setBranch] = useState(settings?.mainBranch);
  const [period, setPeriod] = useState(settings?.period);
  const [repositoryDirty, setRepositoryDirty] = useState(false);
  const [commandDirty, setCommandDirty] = useState(false);
  const [repositoryError, setRepositoryError] = useState('Обязательное поле для ввода');
  const [commandError, setCommandError] = useState('Обязательное поле для ввода');
  const [formValid, setFormValid] = useState(false);

  let submitJson = {
    "repoName": repository || '',
    "buildCommand": command || '',
    "mainBranch": branch || 'master',
    "period": period || 0
  }

  useEffect(() => {
    (commandError || repositoryError) ? setFormValid(false) : setFormValid(true);
    repository?.length && command?.length ? setFormValid(true) : setFormValid(false);
  }, [commandError, repositoryError, repository, command])

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
        setRepository('');
        setCommand('');
        setBranch('');
        setPeriod('0');
        history.push('/');
      })
      .catch(() => {
        setRepositoryError('Не удалось клонировать репозиторий')
      })
  }

  function onCancel() {
    history.push('/');
  }

  return (
    <div className="form">
      <form>
        <div className="base-input">
          <label>
            <div className='label'>GitHub repository<i>*</i></div>
            <div className="form-input">
              <input className="ci-input"
                     type='text'
                     name='repository'
                     data-testid='form-repository'
                     value={repository}
                     onBlur={e => blurHandler(e)}
                     onChange={e => repositoryHandler(e)}
                     placeholder="user-name/repo-name"
              />
              {repository !== '' &&
              <i className="icon-clear"
                 data-testid='form-repository-clear-btn'
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
            <div className='form-input'>
              <input className='ci-input'
                     type='text'
                     name='command'
                     data-testid='form-command'
                     value={command}
                     onBlur={e => blurHandler(e)}
                     onChange={e => commandHandler(e)}
                     placeholder='build command'
              />
              {command !== '' &&
              <i className="icon-clear"
                 data-testid='form-command-clear-btn'
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
                     data-testid='form-branch'
                     value={branch}
                     onChange={e => branchHandler(e)}
                     placeholder="user-name/repo-name"
              />
              {branch !== '' &&
              <i className="icon-clear"
                 data-testid='form-branch-clear-btn'
                 onClick={() => setBranch('')}/>
              }
            </div>
          </label>
        </div>
        <div className="small-input">
          <label>Synchronize every</label>
          <MaskedInput className="ci-input"
                       mask={[/[1-9]/, /\d/, /\d/]}
                       name='period'
                       data-testid='form-period'
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
                  disabled={!formValid || isFetching}
                  data-testid='form-btn-submit'>
            <span>Save</span>
          </button>
          <button className="ci-btn ci-btn__big"
                  data-testid="form-btn-cancel"
                  disabled={isFetching}
                  onClick={onCancel}>
            <span>Cancel</span>
          </button>
        </div>
      </form>
    </div>
  )
}
