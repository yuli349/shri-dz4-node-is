import React, {Fragment} from 'react';
import Moment from 'react-moment';

import './BuildItem.scss';

function renderStatus(status) {
  switch (true) {
    case status === 'Success':
      return 'ok';
    case status === 'Fail':
      return 'fail';
    default:
      return 'wait';
  }
}

function normalizeTime(time) {
  return new Date(`${time.replace(/Z/gi, '').replace(/\s+/g, 'T')}Z`);
}

function secToTime(sec) {
  let minutes = (sec / 60).toFixed(0);
  let hours = Math.trunc(sec / 3600);
  let minWithoutHours = minutes - hours * 60;
  if (minutes < 60) return minutes + " min";
  else return hours + " h " + minWithoutHours + " min";
}

export const BuildItem = ({build}) => {
  let commitHash = build.commitHash.slice(0, 8);
  return (
    <Fragment>
      <div className={`build__info status-${renderStatus(build.status)}`}>
        <i className="build__info-icon"/>

        <div className="build__info-status">
          <div className="build__info-status-top">
                            <span className="build__info-number">
                                {'#' + build.buildNumber}
                            </span>
            <span className="build__info-status-name">
                                {build.commitMessage}
                            </span>
          </div>
          <div>
                            <span className="build__info-branch">
                                <i className="icon"/> {build.branchName}
                              <span>{commitHash}</span>
                            </span>
            <span className="build__info-user">
                                <i
                                  className="icon"/> <span>{build.authorName}</span>
                            </span>
          </div>
        </div>
      </div>
      <div>
        {build.start &&
        <div className="build__date">
          <i className="icon"/>
          <Moment date={normalizeTime(build.start)} format="D MMM HH:mm"/>
        </div>
        }
        {build.duration &&
        <div className="build__time">
          <i className="icon"/> <span>{secToTime(build.duration)}</span>
        </div>
        }
      </div>
    </Fragment>
  )

}
