import React, {Fragment} from 'react';

import './Header.scss';

export const Header = ({title, children}) => {
  return (
    <Fragment>
      <div className="header">
        <div className="header__title">
          {title}
        </div>
        <div className="header__btns">
          {children}
        </div>
      </div>
    </Fragment>
  )

}
