import React, { Component } from 'react';
import Board from './components/Board/Board';
import PlayerPanel from './components/PlayerPanel/PlayerPanel';
import GameControls from './components/GameControls/GameControls';
import { INITIAL_STATE, LOSER_NUMBER } from './App.consts';
import {
  act, rollDice, zeroCurrentScore, toggleCurrentPlayer,
  updateCurrentScore, checkForWin, announceWinner, rollCurrentIntoOverviewScore
} from './App.gameActions';

import './App.scss';

export default class App extends Component {

  state = {...INITIAL_STATE};

  handleOnGameReset() {
    this.setState({...INITIAL_STATE});
  }

  /**
   * @description determins the current player and returns a shallow copy.
   * Good for manipulating the current player in place, but not modifying the state.
   * @returns a copy of the current player
  */
  getCurrentPlayer() {
    const { p1, p2, currentPlayerId } = this.state;
    return currentPlayerId === 'p1' ? {...p1} : {...p2};
  }

  handleOnRoll() {
    const state = rollDice({...this.state});
    if (state.dieValue === LOSER_NUMBER) {
      this.setState({
        ...act(state, [
          zeroCurrentScore,
          toggleCurrentPlayer
        ])
      });
    } else {
      this.setState({
        ...act(state, [
          updateCurrentScore,
          checkForWin,
          announceWinner
        ])
      });
    }
  }

  handleOnHold() {
    this.setState({
      ...act(this.state, [
        rollCurrentIntoOverviewScore,
        toggleCurrentPlayer
      ])
    });
  }

  render() {
    const { p1, p2, currentPlayerId, dieValue, winner } = this.state;
    return (
      <div className="pg-app">
        <Board>
          <PlayerPanel player={p1} active={currentPlayerId === 'p1'} left />
          <GameControls dieValue={dieValue} disabled={winner}
            onGameReset={this.handleOnGameReset.bind(this)}
            onRoll={this.handleOnRoll.bind(this)}
            onHold={this.handleOnHold.bind(this)}
          />
          <PlayerPanel player={p2} active={currentPlayerId === 'p2'} right />
        </Board>
      </div>
    );
  }
}
