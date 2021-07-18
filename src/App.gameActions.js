/*
A game action is a function that takes game state, and returns game state
*/
import { WIN_THRESHOLD } from './App.consts';

export function act(gameState, actions) {
  return actions.reduce((state, action) => action(state), {...gameState});
}

export function rollDice(gameState) {
  const dieValue = Math.floor(Math.random() * 6) + 1;
  return ({ ...gameState, dieValue });
}

export function setCurrentScore({ currentPlayerId, ...gameState}, currentScore) {
  const currentPlayer = gameState[currentPlayerId];
  return {
    ...gameState, currentPlayerId,
    [currentPlayerId]: {
      ...currentPlayer,
      currentScore
    }
  };
}

export function zeroCurrentScore({ currentPlayerId, ...gameState}) {
  return setCurrentScore({currentPlayerId, ...gameState}, 0);
}

export function toggleCurrentPlayer({ currentPlayerId, ...gameState}) {
  return {
    ...gameState,
    currentPlayerId: currentPlayerId === 'p1' ? 'p2' : 'p1'
  };
}

export function updateCurrentScore({ currentPlayerId, dieValue, ...gameState }) {
  const { currentScore } = gameState[currentPlayerId];

  return setCurrentScore({currentPlayerId, dieValue, ...gameState}, currentScore + dieValue);
}

export function checkForWin({ currentPlayerId, ...gameState }) {
  const { currentScore, overallScore } = gameState[currentPlayerId];
  const win = currentScore + overallScore >= WIN_THRESHOLD;
  return {
    ...gameState, currentPlayerId,
    winner: win ? currentPlayerId : undefined
  };
}

export function announceWinner({ winner, ...gameState }) {
  if (winner) {
    const { name, currentScore, overallScore } = gameState[winner];
    alert(`${name} has won with total score of ${currentScore + overallScore}! (${WIN_THRESHOLD} to win)`);
  }
  return { winner, ...gameState };
}

export function rollCurrentIntoOverviewScore({ currentPlayerId, ...gameState }) {
  const {currentScore, overallScore, ...currentPlayer} = gameState[currentPlayerId];
  return {
    ...gameState, currentPlayerId,
    [currentPlayerId]: {
      ...currentPlayer,
      overallScore: overallScore + currentScore,
      currentScore: 0
    }
  };
}