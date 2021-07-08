import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Start } from '../src/pages/Start/Start';
import events from '@testing-library/user-event';

it('При клике на кнопку Open settings, идет переход по урлу /settings', () => {
  const history = createMemoryHistory({});

  const start = (
    <Router history={history}>
      <Start />
    </Router>
  )

  const { getByTestId } = render(start);

  const openSettings = getByTestId('open-settings');

  events.click(openSettings);
  expect(history.location.pathname).toBe('/settings');
});

it('При клике на кнопку Settings, идет переход по урлу /settings', () => {
  const history = createMemoryHistory({});

  const start = (
    <Router history={history}>
      <Start />
    </Router>
  )

  const { getByTestId } = render(start);

  const linkSettings = getByTestId('link-settings');

  events.click(linkSettings);
  expect(history.location.pathname).toBe('/settings');
});
