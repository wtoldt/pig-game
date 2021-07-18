import React, { Component } from 'react';
import Board from './components/Board/Board';
import PlayerPanel from './components/PlayerPanel/PlayerPanel';
import { PLAYER_STATE } from './App.consts';

import './App.scss';

export default class App extends Component {

  state = {
    p1: {name: 'P1', ...PLAYER_STATE},
    p2: {name: 'P2', ...PLAYER_STATE},
    currentPlayer: 'P1',
    winner: undefined
  };

  render() {
    const { p1, p2, currentPlayer } = this.state;
    return (
      <div className="pg-app">
        <Board>
          <PlayerPanel player={p1} active={currentPlayer === p1.name} left />
          <PlayerPanel player={p2} active={currentPlayer === p2.name} right />
        </Board>
      </div>
    );
  }
}
