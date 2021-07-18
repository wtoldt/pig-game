import React, { Component } from 'react';
import Board from './components/Board/Board';
import PlayerPanel from './components/PlayerPanel/PlayerPanel';
import GameControls from './components/GameControls/GameControls';
import { INITIAL_STATE, WIN_THRESHOLD, LOSER_NUMBER } from './App.consts';

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
    const { p1, p2, currentPlayerId } = this.state;
    const currentPlayer = this.getCurrentPlayer();

    const dieValue = Math.floor(Math.random() * 6) + 1;
    if (dieValue === LOSER_NUMBER) {
      //the player loses their current score, and next player takes a turn
      currentPlayer.currentScore = 0;
      this.setState({
        dieValue,
        p1: currentPlayerId === 'p1' ? currentPlayer : p1,
        p2: currentPlayerId === 'p2' ? currentPlayer : p2,
        currentPlayerId: currentPlayerId === 'p1' ? 'p2' : 'p1'
      });
    } else {
      currentPlayer.currentScore += dieValue;
      const total = currentPlayer.currentScore + currentPlayer.overallScore;
      if (total >= WIN_THRESHOLD) {
        //player has won, game is over!
        this.setState({
          winner: currentPlayer,
          p1: currentPlayerId === 'p1' ? currentPlayer : p1,
          p2: currentPlayerId === 'p2' ? currentPlayer : p2,
          dieValue
        });
        alert(`${currentPlayer.name} has won with total score of ${total}! (${WIN_THRESHOLD} to win)`);
      } else {
        this.setState({
          p1: currentPlayerId === 'p1' ? currentPlayer : p1,
          p2: currentPlayerId === 'p2' ? currentPlayer : p2,
          dieValue
        });
      }
    }
  }

  handleOnHold() {
    const { p1, p2, currentPlayerId } = this.state;
    const currentPlayer = this.getCurrentPlayer();

    //add currentScore to overallScore and change currentPlayer
    currentPlayer.overallScore += currentPlayer.currentScore;
    currentPlayer.currentScore = 0;
    this.setState({
      p1: currentPlayerId === 'p1' ? currentPlayer : p1,
      p2: currentPlayerId === 'p2' ? currentPlayer : p2,
      currentPlayerId: currentPlayerId === 'p1' ? 'p2' : 'p1'
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
