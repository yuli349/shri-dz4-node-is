import * as React from 'react';
import './Footer.scss';

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__wrapper">
        <ul className="footer__menu">
          <li>Support</li>
          <li>Learning</li>
          <li>Русская версия</li>
        </ul>
        <div>© 2021 Yuliya Belitskaya</div>
      </div>
    </div>
  )
}
