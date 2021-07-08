import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { Header } from '../src/components/Header/Header';

it('Header рендерится', () => {
  const { container } = render(<Header />);
  expect(container.firstChild).toBeInTheDocument();
});
