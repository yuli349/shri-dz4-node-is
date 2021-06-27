import React, {Fragment} from 'react';
import {default as AnsiUp} from 'ansi_up';
import {BuildItem} from '../../components/BuildItem/BuildItem';
import {Header} from '../../components/Header/Header';
import build from '../../assets/data/build.json';

import './BuildDetail.scss';
import {NavLink} from "react-router-dom";

export const BuildDetail = () => {
  const ansi_up = new AnsiUp();
  const txt = '[2K[1G[1myarn run v1.22.5[22m\n' +
    '[2K[1G[2m$ webpack --config webpack/production.js --color[22m\n' +
    '/Users/fedinamid/Workspace/webpack-config/webpack\n' +
    'Hash: [1m2a88f51a3c1cffdbdac8[39m[22m\n' +
    'Version: webpack [1m4.44.1[39m[22m\n' +
    'Time: [1m65[39m[22mms\n' +
    'Built at: 06/19/2021 [1m3:08:51 AM[39m[22m\n' +
    '      [1mAsset[39m[22m       [1mSize[39m[22m  [1mChunks[39m[22m  [1m[39m[22m                 [1m[39m[22m[1mChunk Names[39m[22m\n' +
    '    [1m[32mmain.js[39m[22m  963 bytes       [1m0[39m[22m  [1m[32m[emitted][39m[22m        main\n' +
    '[1m[32mmain.js.map[39m[22m   4.52 KiB       [1m0[39m[22m  [1m[32m[emitted] [dev][39m[22m  main\n' +
    'Entrypoint [1mmain[39m[22m = [1m[32mmain.js[39m[22m [1m[32mmain.js.map[39m[22m\n' +
    '[0] [1m./src/index.js[39m[22m 1 bytes {[1m[33m0[39m[22m}[1m[32m [built][39m[22m\n' +
    '[2K[1GDone in 0.84s.';
  let html = ansi_up.ansi_to_html(txt);
  return (
    <Fragment>
      <div className="detail">
        <Header title={build.data[0].commitMessage}>
          <button className="ci-btn ci-btn__small header__btn-rebuild">
            <i className="icon"/> <span>Rebuild</span>
          </button>

          <NavLink className="ci-btn ci-btn__small header__btn-settings"
                   to="/settings"><i
            className="icon"/></NavLink>
        </Header>
        <div className="build">
          <BuildItem build={build.data[0]}/>
        </div>
        {html &&
        <div className="detail__logs">
          <pre dangerouslySetInnerHTML={{__html: html}}/>
        </div>
        }
      </div>
    </Fragment>
  )

}
