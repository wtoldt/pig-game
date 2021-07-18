import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Die from './Die/Die';

import './GameControls.scss';

export default class GameControls extends Component {

  static propTypes = {
    onGameReset: PropTypes.func.isRequired,
    onRoll: PropTypes.func.isRequired,
    onHold: PropTypes.func.isRequired,
    dieValue: PropTypes.number,
    disabled: PropTypes.bool
  };

  static defaultProps = {
    dieValue: 1,
    disabled: false
  };

  render() {
    const { onGameReset, onRoll, onHold, dieValue, disabled } = this.props;
    const classnames = classNames('pg-game-controls');
    return (
      <div className={classnames}>
        <div className="reset-btn-container">
          <button onClick={onGameReset}>Reset Game</button>
        </div>
        <div className="die-container">
          <Die value={dieValue} />
        </div>
        <div className="roll-btn-container">
          <button onClick={onRoll} disabled={disabled}>Roll</button>
        </div>
        <div className="hold-btn-container">
          <button onClick={onHold} disabled={disabled}>Hold</button>
        </div>
      </div>
    );
  }
}