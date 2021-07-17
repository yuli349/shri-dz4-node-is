import * as React from 'react'
import './Header.scss';

interface HeaderProps {
  title: string;
  children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({title, children}) => {
  return (
    <div className="header">
      <div className="header__title">
        {title}
      </div>
      <div className="header__btns">
        {children}
      </div>
    </div>
  )
}
