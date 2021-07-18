export const PLAYER_STATE = {
  overallScore: 0,
  currentScore: 0
};

export const INITIAL_STATE = {
  p1: {name: 'P1', ...PLAYER_STATE},
  p2: {name: 'P2', ...PLAYER_STATE},
  currentPlayerId: 'p1',
  dieValue: 1,
  winner: undefined
};

export const WIN_THRESHOLD = 28;
export const LOSER_NUMBER = 1;