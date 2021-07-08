import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Form} from '../src/components/Form/Form';
import {store} from '../src/reducers/index';
import {Provider} from 'react-redux';
import {Router} from "react-router-dom";

describe('Форма настроек', () => {
  const routerWrapper = (children) => {
    return (
      <Provider store={store}>
        {children}
      </Provider>
    );
  };

  it('Данные вводятся в инпут', () => {
    const form = routerWrapper(<Form/>);
    const {getByTestId} = render(form);

    const repositoryInput = getByTestId('form-repository');
    const commandInput = getByTestId('form-command');
    const branchInput = getByTestId('form-branch');
    const periodInput = getByTestId('form-period');

    fireEvent.change(repositoryInput, {target: {value: 'input text'}});
    expect(repositoryInput.value).toBe('input text');

    fireEvent.change(commandInput, {target: {value: 'input text'}});
    expect(commandInput.value).toBe('input text');

    fireEvent.change(branchInput, {target: {value: 'input text'}});
    expect(branchInput.value).toBe('input text');

    fireEvent.change(periodInput, {target: {value: '50'}});
    expect(periodInput.value).toBe('50');
  });

  it('Инпут очищается по клику на крестик "Очистить"', () => {
    const form = routerWrapper(<Form/>);
    const {getByTestId} = render(form);

    const repositoryInput = getByTestId('form-repository');
    const commandInput = getByTestId('form-command');
    const branchInput = getByTestId('form-branch');

    const repositoryInputClearBtn = getByTestId('form-repository-clear-btn');
    const commandInputClearBtn = getByTestId('form-command-clear-btn');
    const branchInputClearBtn = getByTestId('form-branch-clear-btn');

    fireEvent.change(repositoryInput, {target: {value: 'input text'}});
    fireEvent.click(repositoryInputClearBtn);
    expect(repositoryInput.value).toBe('');

    fireEvent.change(commandInput, {target: {value: 'input text'}});
    fireEvent.click(commandInputClearBtn);
    expect(commandInput.value).toBe('');

    fireEvent.change(branchInput, {target: {value: 'input text'}});
    fireEvent.click(branchInputClearBtn);
    expect(branchInput.value).toBe('');
  });

  it('При клике на кнопку Cancel, идет переход по урлу /', () => {
    const history = createMemoryHistory();

    const settings = (
      <Router history={history}>
        <Provider store={store}>
          <Form/>
        </Provider>
      </Router>
    )

    const {getByTestId} = render(settings);
    const cancelBtn = getByTestId('form-btn-cancel');

    fireEvent.click(cancelBtn);
    expect(history.location.pathname).toBe('/');
  });
});
