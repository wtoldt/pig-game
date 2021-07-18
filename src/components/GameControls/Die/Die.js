import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { DIE_VALUES } from './Die.consts';

import './Die.scss';

export default class Die extends Component {

  static propTypes = {
    value: PropTypes.number.isRequired
  };

  static defaultProps = {
    value: 1
  };

  render() {
    const { value } = this.props;
    const [c1, c2, c3, c4, c5, c6, c7, c8, c9] = DIE_VALUES[value];
    const classnames = classNames('pg-die');
    return (
      <div className={classnames}>
        <div className="row">
          <div id="c1" className="cell">{c1}</div>
          <div id="c2" className="cell">{c2}</div>
          <div id="c3" className="cell">{c3}</div>
        </div>
        <div className="row">
          <div id="c4" className="cell">{c4}</div>
          <div id="c5" className="cell">{c5}</div>
          <div id="c6" className="cell">{c6}</div>
        </div>
        <div className="row">
          <div id="c7" className="cell">{c7}</div>
          <div id="c8" className="cell">{c8}</div>
          <div id="c9" className="cell">{c9}</div>
        </div>
      </div>
    );
  }
}