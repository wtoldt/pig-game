import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './PlayerPanel.scss';

export default class PlayerPanel extends Component {

  static propTypes = {
    player: PropTypes.object.isRequired,
    active: PropTypes.bool,
    left: PropTypes.bool,
    right: PropTypes.bool
  };

  static defaultProps = {
    active: false,
    left: false,
    right: false
  };

  render() {
    const { player: { name, overallScore, currentScore }, active, left, right } = this.props;
    const classnames = classNames('pg-player-panel', { active, left, right });
    return (
      <div className={classnames}>
        <div className="player-name-container">
          <div className="player-name">{ name }</div>
          <div className="overall-score">{ overallScore }</div>
        </div>
        <div className="current-score-container">
          <div className="current-score">{ currentScore }</div>
        </div>
      </div>
    );
  }
}