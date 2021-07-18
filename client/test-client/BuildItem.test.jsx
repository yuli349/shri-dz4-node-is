import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {createMemoryHistory} from 'history';

import { BuildItem } from '../src/components/BuildItem/BuildItem';
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from '../src/store/reducers/index';

describe('Тесты компонента BuildItem', () => {
  it('Изменяется класс при передачи пропса status Success', () => {
    const history = createMemoryHistory();

    const build = (
      <Router history={history}>
        <Provider store={store}>
          <BuildItem status='Success'/>
        </Provider>
      </Router>
    )

    const {getByTestId} = render(build);

    const buildStatus = getByTestId('build-status');

    expect(buildStatus).toHaveClass('status-ok');
  });
});
