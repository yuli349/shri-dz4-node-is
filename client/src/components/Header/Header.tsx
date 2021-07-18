import * as React from 'react'
import './Header.scss';
import {NavLink} from "react-router-dom";

interface HeaderProps {
  title: string;
  page?: string;
  children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({title, page, children}) => {
  return (
    <div className="header">
      {
        page === 'detail'
          ?
          <NavLink to="/" className="header__link">
            <div className="header__title">
              {title}
            </div>
          </NavLink>
          :
          <div className="header__title">
            {title}
          </div>
      }
      <div className="header__btns">
        {children}
      </div>
    </div>
  )
}
