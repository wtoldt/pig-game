import { WIN_THRESHOLD } from './App.consts';

/*
  Game actions are split into categories: utils, and actions.

  A game action is a function that takes game state, and returns game state.
  Actions take no other parameters, and are intended to be fed into act()

  Utils are functions that help the process. They do not necessarily follow the method
  signature of actions, although they can still take and return state.
*/

///////////////////////////////////////////////////////////////////////////////////////
////////                               UTILITIES                               ////////
///////////////////////////////////////////////////////////////////////////////////////


/**
 * pass gameState through an array of actions
 * @param {state} gameState initial state
 * @param {array} actions array of actions to take
 * @returns updated gameState (does not mutate initial state)
 */
export function act(gameState, actions) {
  return actions.reduce((state, action) => action(state), {...gameState});
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

export const utils = {
  act, setCurrentScore
};

///////////////////////////////////////////////////////////////////////////////////////
////////                               ACTIONS                                 ////////
///////////////////////////////////////////////////////////////////////////////////////

export function rollDice(gameState) {
  const dieValue = Math.floor(Math.random() * 6) + 1;
  return ({ ...gameState, dieValue });
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

export const actions = {
  rollDice,  zeroCurrentScore, toggleCurrentPlayer, updateCurrentScore, checkForWin,
  announceWinner, rollCurrentIntoOverviewScore
}